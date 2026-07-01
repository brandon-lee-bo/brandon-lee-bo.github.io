---
title: Deploy Private Proxy VPS
name: deploy-private-proxy-vps
description: A practical skill for setting up a stable and reliable private proxy tool on a VPS.
type: Infrastructure Skill
category: Practical
image: /skills/deploy-private-proxy-vps.png
tags: vps, proxy, debian, xray, reality, hysteria2, networking
---

# Deploy a Private Proxy VPS

Use only on infrastructure the user owns or administers. Treat every IP, password, UUID, key, token, URL, and QR code as secret. Never place real secrets in skill files, logs, examples, third-party converters, or final answers unless necessary for delivery. Rotate any credential exposed in chat.

## 1. Verify current sources

Before installing, check current official documentation for:

- `MHSanaei/3x-ui`
- XTLS/Xray REALITY and Vision
- Hysteria2
- Mihomo proxy syntax
- Loon protocol support

Use tutorials only as secondary references. Prefer current official installers and configuration schemas.

## 2. Establish a trustworthy SSH path

Connect read-only first and confirm Debian, ports, memory, disk, interfaces, and firewall state.

If TCP connects but SSH closes before displaying a server banner, inspect the operator machine before blaming the VPS:

- Check for Clash/Mihomo TUN adapters and synthetic routes.
- A suspicious one-hop traceroute or every tested port appearing open suggests TUN interception.
- Keep TUN enabled when required, but add the VPS IPv4 `/32` and IPv6 `/128` to Mihomo `tun.route-exclude-address`.
- If a merge/script regenerates Mihomo configuration, add these exclusions to the source script or persistent override, not only the generated YAML.
- Restart/reload Mihomo and verify that SSH now receives a real `OpenSSH ... Debian` banner.

Never enable a deny-by-default firewall until the active SSH port is explicitly allowed.

## 3. Prepare Debian

Perform these steps idempotently:

1. Update package indexes and install `curl`, `jq`, `openssl`, `ca-certificates`, `ufw`, `sqlite3`, `socat`, and `cron`.
2. Add 1 GB swap on a 1 GB VPS if no swap exists.
3. Enable `fq` plus BBR through a file under `/etc/sysctl.d/`; verify the active congestion control.
4. Install all security updates.
5. Reboot after a kernel update and verify the new kernel and service recovery.

## 4. Install 3x-ui and REALITY

Install the current official 3x-ui release with SQLite. Use randomized panel credentials and base path. Prefer a trusted domain or IP certificate when currently supported; otherwise expose the panel only through an SSH tunnel.

Create one inbound:

- Protocol: VLESS
- Transport: RAW/TCP
- Port: TCP 443
- Security: REALITY
- Client flow: `xtls-rprx-vision`
- Fingerprint: `chrome`
- Target and SNI: a stable TLS 1.3 site reachable directly from the VPS
- SpiderX: `/`
- Proxy Protocol and HTTP obfuscation: off
- Random UUID, X25519 keys, and short ID

The client flow is configured on the client record, not merely on the inbound. Verify the generated Xray configuration and confirm TCP 443 is listening.

## 5. Install Hysteria2

Install with the current official Hysteria2 installer. It may share port number 443 with REALITY because Hysteria2 uses UDP while REALITY uses TCP. However, client features named `Block QUIC` may block UDP 443 and unintentionally kill Hysteria2. In that case, move Hysteria2 to UDP 8443 or another allowed UDP port; changing the port does not inherently reduce performance or security.

Configure:

- Listen: UDP 443, or UDP 8443 when UDP 443 is blocked
- Random strong password
- Trusted certificate and key
- HTTPS masquerade
- No server bandwidth cap for ordinary personal use

If reusing a short-lived panel certificate, copy it to files readable by the unprivileged Hysteria service and create a renewal hook or periodic sync that reloads both Hysteria2 and the HTTPS subscription server.

When logs show repeated destination IPv6 timeouts, verify both VPS egress families. If only some target IPv6 routes fail, enable protocol sniffing with domain rewriting and use the official direct outbound mode that prefers IPv4 with IPv6 fallback. Do not disable server IPv6 globally without evidence.

Confirm the log contains `server up and running` and the selected UDP port is listening.

## 6. Harden exposure

Use UFW with default deny incoming and allow only:

- Active SSH TCP port
- TCP 80 only when required for certificate renewal
- TCP 443 for REALITY
- Selected UDP port for Hysteria2
- Panel HTTPS port
- Private subscription HTTPS port

Mirror these rules in the VPS provider's security group. Enable Fail2ban for SSH. Keep the panel path, credentials, API token, node keys, and subscription path private.

## 7. Publish private subscriptions

Do not send node secrets to online subscription converters.

Serve subscriptions over HTTPS with a cryptographically random path token and `Cache-Control: no-store`.

Create separate native formats:

1. **General URI subscription:** Base64-encoded newline-separated `vless://` and `hysteria2://` URIs.
2. **Clash/Mihomo subscription:** Native YAML containing `vless` with `reality-opts` and `hysteria2`.
3. **Loon subscription:** Plain-text Loon node lines when Loon-specific options are required. A merged list may contain the standard nodes plus an A/B node such as:

```text
NAME = Hysteria2,HOST,PORT,"PASSWORD",skip-cert-verify=false,tls-name=HOST,udp=true,fast-open=true
```

Do not assume a Base64 URI subscription will import into Clash Verge. If Loon succeeds but Clash fails, provide native Mihomo YAML. Set Hysteria2 as the default selector when it consistently performs better.

Keep old subscription paths working during migration. Publish a new merged Loon URL, confirm all expected nodes appear, and only then tell the user to remove duplicate subscriptions.

Validate YAML with the user's installed Mihomo binary:

```text
mihomo -t -f <downloaded-config>
```

Then start an isolated temporary Mihomo instance and make an HTTPS request through its local proxy.

## 8. Test the data plane

Service status is insufficient. Test both protocols end to end:

- Start a temporary local Xray SOCKS client using the generated REALITY credentials.
- Start a temporary Hysteria2 SOCKS client using certificate verification.
- Request an external IP endpoint through each proxy.
- The returned IP must equal the VPS public IP.
- Test panel and subscription URLs externally and require HTTP 200 with successful certificate verification.
- Verify services, firewall, listening TCP/UDP sockets, BBR, swap, renewal automation, and zero pending security updates.

Remove temporary configs because they contain credentials.

## 9. Diagnose performance

If Hysteria2 is fast but REALITY is slow:

1. Measure direct latency, jitter, and packet loss to the VPS outside the proxy.
2. Verify Vision, SNI, public key, short ID, and fingerprint.
3. Check server CPU, retransmissions, and provider congestion.

REALITY is TCP-based and degrades sharply under loss; Hysteria2 is designed to tolerate lossy or congested paths. Material packet loss can fully explain the difference. Do not promise that tuning can overcome a poor TCP route. Prefer Hysteria2 operationally and retain REALITY as fallback.

If Loon reports high latency while browsing and video remain fast:

- Treat Loon's number as full request setup time, not pure RTT.
- Run several requests and ignore the first cold QUIC/TLS handshake.
- Compare median time-to-first-byte and real browsing/video behavior.
- Check server CPU, UDP buffer errors, NIC drops, MTU, and current socket buffers before tuning.
- Do not enlarge buffers or raise process priority when CPU is idle, UDP buffer errors are zero, and throughput is stable.

Create a reversible Fast Open A/B node before changing server transport parameters. Keep certificate verification enabled (`skip-cert-verify=false`), use the same password, SNI, and UDP port, and change only `fast-open=true`. If it improves repeated real-world tests, merge it into the Loon subscription while preserving the original node as fallback.

Do not put client bandwidth hints in a shared Hysteria2 URI. They depend on each device's access network. If testing Brutal mode locally, use approximately 70-80% of measured access bandwidth and compare against default BBR; excessive values can increase queueing delay.

## 10. Change safely

Before each configuration change:

1. Copy every affected file to a timestamped backup.
2. Change one variable at a time.
3. Validate syntax before reload.
4. Reload rather than reboot when possible.
5. Test externally and through the actual proxy.
6. Preserve the old node or subscription until the replacement passes.

Maintain an explicit rollback command or backup path. Never combine firewall, port, certificate, and protocol changes into one unverified step.

## 11. Finish safely

Rotate the initial root password, save secrets only in a user-approved secure deliverable, and avoid echoing them repeatedly. Provide concise import instructions for Loon and Clash separately. Report exactly which end-to-end tests passed and any provider-level firewall action still required.

## NOTE
useful wedsite (subscription): https://www.bagevm.com/cart.php?a=checkout&e=false
