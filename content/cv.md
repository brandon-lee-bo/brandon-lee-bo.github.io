# Bohan Li

Tel: +86 15975558614  
Email: [milbh_brandon@mail.scut.edu.cn](mailto:milbh_brandon@mail.scut.edu.cn)  
Website: [brandon-lee-bo.github.io](https://brandon-lee-bo.github.io/)

## Education

**South China University of Technology**, Guangzhou, China  
*Sept. 2023 -- July 2027*

B.Eng. in Microelectronics Science and Engineering  
GPA: 3.81/4.00  
Relevant Courses: Digital Electronic Circuits, Analog Electronic Circuits, Signals and Systems, Calculus, C++

**Hong Kong University of Science and Technology**  
*Aug. 2026 -- Present*

Exchange Student, Hong Kong  
Current coursework: Architecture for AI Systems, Computer Organization & Design, Generative AI.

## Research Interests

Power & Performance Modeling, CPU Microarchitecture, Hardware-Software Co-design for AI.

## Publications and Manuscripts

(† Equal contribution, * Corresponding author)

1. **Bohan Li**†, Shengmin Li†, Xinyu Shi, Enyi Yao, Francky Catthoor, Simei Yang*. FlexVector: A SpMM Vector Accelerator with Flexible VRF for GCNs on Varying-Sparsity Graphs. *IEEE Transactions on Computers* (IF: 4.9, Accepted). Preprint: [arXiv:2604.10113](https://arxiv.org/abs/2604.10113)
2. **Bohan Li**†, Xiangfeng Sun†, Ceyu Xu, Yuan Xie*. Not All Reuse Is Worth Keeping: Context-Aware Prefetch Retention for Shared Caches. *HPCA 2027* (under rebuttal).

## Research Experience

### Shared-Cache Management: KEEPER

**Research Intern, Hong Kong University of Science and Technology, supervised by Prof. Yuan Xie**  
*Apr. 2026 -- July 2026*

- Worked on KEEPER, a shared-LLC prefetch-retention policy combining per-fill reuse qualification with epoch-level source-core selection based on prefetch service and retirement blocking. Cross-core decisions remain off the LLC fill path.
- Implemented policies and baselines in ChampSim, ran 4-, 8-, and 16-core experiments, and assessed hardware feasibility through RTL synthesis. Drafted the manuscript and refined its argument with collaborators.
- Improved geometric-mean weighted speedup by **3.20%** over Mockingjay and **1.56%** over CARE across 80 heterogeneous four-core mixes, while preserving original priority for only 9.33% of admitted prefetch fills.

### FlexVector: GCN Accelerator Design

**South China University of Technology, supervised by Prof. Simei Yang**  
*July 2024 -- Apr. 2026*

- Designed a vector-based SpMM accelerator for GCN inference, using fixed and dynamic VRF regions to support irregular graph workloads. Combined inter-tile edge cutting and intra-tile vertex cutting with a hierarchical dataflow to reduce memory traffic.
- Led experiments and manuscript writing and revision. Used RTL and simulation to evaluate power, performance, and area, including the effects of graph preprocessing and storage organization.
- Evaluation on five real-world GCN datasets shows **3.78x speedup** and **40.5% lower energy** than a cache-centric baseline at comparable area and equal buffer capacity.

### Frequency-Control Circuits for Microrobots

**Summer Research Intern, Westlake University, supervised by Prof. Wei Wang**  
*July -- Aug. 2025*

- Learned analog IC design using Cadence Virtuoso. Designed and simulated a voltage-controlled ring oscillator, frequency dividers, and phase shifters for microrobot locomotion modes.
- Received the program's **Best Poster Award** for presenting the circuit design and its frequency, phase, power, and area tradeoffs.

## Awards & Honors

- **Best Poster Award**, Westlake University Summer Research Program (2025)
- **National First / Third Prize**, College Student Chip and System Design Competition (2024 / 2025)
- **National Third / South China First Prize**, College IC Innovation Competition (2024)
- **Second-Class Scholarship**, South China University of Technology (2024, 2025)

## Skills

- **Programming and workflow:** Verilog, Python, GitHub, LaTeX
- **Architecture & circuit tools:** ChampSim, CACTI, Synopsys Design Compiler, Vivado, Cadence Virtuoso
- **Languages:** Mandarin Chinese (native), English (IELTS 6.5)
