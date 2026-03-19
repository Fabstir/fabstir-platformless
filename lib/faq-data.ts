export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "users" | "hosting";
}

export const faqData: FAQItem[] = [
  // General FAQ
  {
    id: "general-1",
    question: "What is Platformless AI?",
    category: "general",
    answer: `Platformless AI is a decentralized peer-to-peer network for accessing AI models without trusting a centralized company.

When you use traditional AI platforms, you're forced to:
• Trust them with your private data
• Accept their content moderation policies
• Risk vendor lock-in with proprietary APIs
• Hope they don't ban your account

Platformless AI eliminates these risks through:

**End-to-End Encryption**: Your prompts and responses are encrypted on your device before being sent. GPU providers, storage nodes, and blockchain observers cannot read your content. Only you hold the decryption keys.

**Smart Contract Payments**: Jobs are assigned and payments are settled automatically via smart contracts on Base L2. No platform takes a cut. No middleman can freeze your funds.

**P2P Model Access**: Connect directly to GPU providers running open-weight models. No centralized platform decides which models you can access or what you can ask them.

**Open Source**: All code is auditable on GitHub. You can verify exactly how encryption works, how payments are processed, and how your data is handled.

**Censorship-Resistant**: No single entity can deplatform you, filter your prompts, or alter your results. The network operates without central control.

Think of it as "Uber for AI" but truly decentralized - no company in the middle, just smart contracts coordinating between users and GPU providers.`,
  },
  {
    id: "general-2",
    question: 'Why "platformless"?',
    category: "general",
    answer: `The word "platformless" captures what makes this approach fundamentally different from traditional AI services.

**The Problem with Platforms**:

Every major AI service today is a **platform** - a centralized company that sits between you and the AI models. This creates several problems:

• **Trust Requirement**: You must trust the platform won't misuse your data, leak your prompts, or train models on your private conversations.
• **Censorship**: Platforms decide what questions you can ask and what answers you receive.
• **Vendor Lock-In**: Proprietary APIs and tools make it expensive to switch providers.
• **Single Point of Failure**: If the platform goes down, changes its terms, raises prices, or bans your account - you have no recourse.
• **Hidden Margins**: Platforms add markup on top of compute costs, and you can't verify actual costs.
• **Deplatforming Risk**: Your access can be revoked at any time, for any reason.

**Why "Platformless" Works**:

Platformless AI replaces the centralized platform with:
• **Smart contracts** for coordination (trustless, automated, censorship-resistant)
• **Direct P2P connections** for model access (no intermediary)
• **End-to-end encryption** for privacy (no one can read your data)
• **Decentralized storage** for conversation history (S5 network, not company servers)
• **Transparent pricing** (see exactly what GPU providers charge)
• **No vendor lock-in** (standard APIs, portable to any provider)

The infrastructure is platformless - no company controls it, no middleman extracts rent, no gatekeeper decides who can participate.

**True Decentralization**: While this website (platformlessai.com) provides a UI, the actual AI inference happens peer-to-peer, payments via smart contracts, and data storage is decentralized. If this website disappeared, you could still use the SDK directly, deploy your own UI, and access the same infrastructure.`,
  },
  {
    id: "general-3",
    question: "How does it work?",
    category: "general",
    answer: `Platformless AI coordinates AI inference through smart contracts, peer-to-peer networking, and cryptographic proofs. Here's the end-to-end flow:

1. **Discovery Phase**: Browse available models and GPU providers via the SDK. Smart contracts track which providers are online and their pricing.

2. **Payment & Job Creation**: Deposit funds (ETH, USDC, or FAB tokens) into a smart contract escrow. A "job" is created on-chain.

3. **Encrypted Session Initialization**: Your device generates a unique encryption key for this session using XChaCha20-Poly1305 AEAD.

4. **Inference Request**: Your prompt is encrypted on your device before leaving. Sent directly to the GPU provider via WebSocket.

5. **Model Inference**: Provider decrypts the prompt, generates a response, and encrypts it before sending back.

6. **Proof of Work**: Every 1000 tokens, the provider generates a STARK proof proving computation occurred. Proof is stored on S5 decentralized storage.

7. **Payment Settlement**: Smart contract verifies the proof and automatically releases payment from escrow to the provider.

8. **Storage**: Your encrypted conversation is stored on S5 decentralized storage. You can retrieve it later using your private key.

**Key Technologies**: Base L2, Smart Contracts, STARK Proofs (Risc0), S5 Storage, XChaCha20-Poly1305 encryption, WebSocket.

**No Platform Overhead**: Unlike traditional platforms, there's no company infrastructure to pay for - just peer-to-peer connections and smart contract logic running on Ethereum.`,
  },
  {
    id: "general-4",
    question: "Is my data private?",
    category: "general",
    answer: `**Yes - end-to-end encryption by default.** Your prompts and responses are encrypted before leaving your device, and only you hold the decryption keys.

**Encryption Details**:

• **Algorithm**: XChaCha20-Poly1305 AEAD (same as Signal, WireGuard, Zcash)
• **Key Exchange**: Ephemeral-Static ECDH (forward secrecy)
• **Session Keys**: Fresh keys for every conversation, stored in memory only

**What This Protects Against**:

✅ Eavesdropping: Network intermediaries see only encrypted data
✅ Data Leaks: Even if S5 storage is breached, conversations are encrypted
✅ Malicious Nodes: GPU providers cannot read your prompts
✅ Blockchain Analysis: On-chain data shows only hashes, not content
✅ Subpoenas/Warrants: No plaintext data exists to hand over
✅ Platform Surveillance: No company can analyze your usage patterns

**What This Doesn't Protect**:

❌ Your Device: If compromised with malware, encryption can't help
❌ GPU Provider Metadata: Providers know your IP, session duration, token count
❌ Blockchain Metadata: Transaction history (job IDs, payment amounts) is public

**Comparison to Traditional Platforms**:

| Feature | Traditional Platforms | Platformless AI |
|---------|----------------------|-----------------|
| Data Privacy | Company sees everything | End-to-end encrypted |
| Data Training | May train on your data | Impossible (encrypted) |
| Data Retention | Indefinite on servers | You control S5 storage |
| Third-party Access | Possible via subpoena | No plaintext exists |

**Performance Impact**: Negligible - session initialization takes ~10ms, per-message encryption/decryption <1ms.`,
  },
  {
    id: "general-5",
    question: "What makes this different from traditional AI platforms?",
    category: "general",
    answer: `The fundamental difference is **who controls your AI experience**: a centralized company vs. trustless smart contracts and peer-to-peer infrastructure.

**Key Differences**:

| Feature | Traditional Platforms | Platformless AI |
|---------|----------------------|----------------|
| **Data Privacy** | Company sees all | End-to-end encrypted |
| **Censorship** | Platform filters content | Censorship-resistant |
| **Account Control** | Can ban you anytime | Wallet-based, no accounts |
| **Vendor Lock-In** | Proprietary APIs | Open standards, portable |
| **Pricing Transparency** | Hidden markup | See exact GPU costs |
| **Model Access** | Limited to approved | Any open-weight model |
| **Trust Model** | Must trust company | Cryptographic proofs |
| **Verification** | Closed source | Open source, audit everything |
| **Deplatforming** | One email and you're banned | Impossible to deplatform |
| **Infrastructure** | Company servers | P2P + decentralized storage |

**The Platformless Advantage**:

**No Vendor Lock-In**: Use standard APIs that work with any provider. Your code is portable. No proprietary tools required.

**True Cost Transparency**: See exactly what GPU providers charge. No hidden margins. Market-driven pricing ensures fairness.

**Censorship-Resistant**: No content moderation policies. No filtered results. No banned topics. The network can't be shut down.

**Privacy by Design**: Encryption isn't optional - it's built into the protocol. Providers literally cannot read your data.

**Who Should Use Platformless AI?**

✅ Privacy-conscious users: Journalists, lawyers, healthcare professionals
✅ Researchers: Sensitive topics, controversial questions
✅ Businesses: Proprietary data that can't be sent to third parties
✅ Developers: Building without vendor lock-in
✅ Crypto natives: Already have wallets, value decentralization
✅ Anyone concerned about deplatforming or censorship

**Who Might Prefer Traditional Platforms?**

• Non-technical users wanting the simplest possible UX
• Enterprise customers needing SLAs and support contracts
• Users wanting frontier closed models (GPT-4o, Claude Opus)
• Those uncomfortable with cryptocurrency wallets

**Bottom Line**: Traditional platforms optimize for convenience and ease of use. Platformless AI optimizes for privacy, censorship-resistance, trustlessness, and true decentralization - without sacrificing competitive pricing.`,
  },
  {
    id: "general-6",
    question: "Can Platformless AI handle images, not just text?",
    category: "general",
    answer: `**Yes.** Platformless AI supports image generation, vision understanding, and OCR alongside text inference — all through the same encrypted peer-to-peer channel.

**Image Generation (FLUX.2)**

Hosts can run a **FLUX.2 diffusion model sidecar** alongside their LLM. You can generate images in three ways:

• **Natural language** — The SDK automatically detects image intent from your prompt (e.g. "generate an image of a futuristic cityscape") and routes it to the FLUX.2 sidecar.
• **OpenAI Images API** — The OpenAI Bridge exposes a standard \`/v1/images/generations\` endpoint. Quality and size parameters map directly to FLUX.2 settings (e.g. \`quality: "hd"\` = 20 inference steps).
• **Direct API** — Call \`generateImage()\` in the SDK for programmatic control.

**Vision (Florence-2)**

Hosts can run **Florence-2** for image understanding — captioning, visual question answering, and scene analysis. Clients send base64-encoded images using the standard OpenAI vision message format, and the bridge passes them to the host's vision model.

**OCR (PaddleOCR)**

**PaddleOCR** runs host-side to extract text from images, useful for document processing, invoice reading, and screenshot analysis.

**Privacy**: All image data — prompts, generated images, and uploaded images — flows through the same end-to-end encrypted WebSocket channel as text. Hosts process your images but the network cannot observe them in transit.`,
  },
  {
    id: "general-7",
    question:
      "Can my company replace its OpenAI or Anthropic API with Platformless AI?",
    category: "general",
    answer: `**Yes — with a single config change.** Platformless AI provides two API compatibility bridges that let you swap out centralised AI backends without rewriting your application code.

**Claude Bridge (Anthropic API compatible)**

The Claude Bridge (\`@fabstir/claude-bridge\`) translates the full **Anthropic Messages API** — including streaming SSE events, tool use, and multi-turn conversations — into the protocol's encrypted WebSocket layer. Your existing Anthropic SDK code works by simply changing the \`baseURL\`:

Point your Anthropic client's \`baseURL\` to the bridge endpoint and set \`apiKey\` to any value. The bridge handles authentication via your Ethereum wallet, session creation, host discovery, and end-to-end encryption automatically.

**OpenAI Bridge (Chat Completions API compatible)**

The OpenAI Bridge (\`@fabstir/openai-bridge\`) does the same for the **OpenAI ecosystem**:

• \`/v1/chat/completions\` — Streaming and non-streaming text, plus tool calls
• \`/v1/images/generations\` — Image generation via FLUX.2
• \`/v1/responses\` — OpenAI Responses API format
• \`/v1/models\` — Model listing

Set \`OPENAI_BASE_URL=http://localhost:3457/v1\` and your OpenAI SDK code works unchanged.

**Why switch?**

• **Privacy** — End-to-end encrypted; no intermediary sees your data
• **No vendor lock-in** — Switch hosts or models without code changes
• **No rate limits** — Based on availability, not arbitrary caps
• **Market pricing** — Direct GPU rates without platform markup
• **Compliance-ready** — Cryptographic guarantees for GDPR and HIPAA scenarios`,
  },
  {
    id: "general-8",
    question: "Who governs the Platformless AI network?",
    category: "general",
    answer: `Platformless AI follows a **progressive decentralisation** roadmap, moving from founder-led bootstrapping to full community governance.

**Current Phase (MVP Bootstrap)**

During the early network, governance is handled by admin keys:
• Contract upgrades and parameter changes controlled by the founding team
• Model approval via the \`ModelRegistry\` contract's owner functions
• Stake slashing for misbehaviour executed by the owner with public evidence
• All admin actions are recorded on-chain and publicly verifiable — nothing happens in secret

**Next Phase (Multi-Sig)**

Governance transitions to a **multi-signature wallet** with community representatives. No single person can make changes unilaterally.

**Final Phase (Full DAO)**

FAB token holders vote on all protocol decisions:
• **Model approval and removal** — Community votes to add or delist models
• **Parameter changes** — Fees, minimum stakes, dispute windows
• **Contract upgrades** — Protocol improvements
• **Dispute resolution** — Stake slashing for misbehaving hosts
• **Treasury allocation** — How network fees are spent

**Model Governance**

The \`ModelRegistry\` smart contract already has community voting functions deployed:
• Anyone can propose a new model (requires a FAB stake)
• FAB token holders vote on proposals
• Passed proposals are executed to add models to the registry

This prevents malicious models, copyright-infringing weights, and impersonation. The voting UI is under development.

**DAO Transition for Slashing**

When the community is ready, the owner calls \`setSlashingAuthority(daoContractAddress)\` to transfer slashing power to the DAO. No contract upgrade is needed — the same function, different caller. This ensures a smooth, non-disruptive handover.`,
  },
  {
    id: "general-9",
    question: "Have the smart contracts been security audited?",
    category: "general",
    answer: `**Yes.** Platformless AI's smart contracts have been audited by **Hacken**, one of the leading blockchain security firms.

**Audit Details**:

• **Auditor**: Hacken (hacken.io)
• **Scope**: Fabstir Marketplace smart contracts — the core contracts that handle session escrow, payment settlement, host staking, and proof verification
• **Date**: March 2026
• **Report**: Available publicly as a PDF on this site

**Why This Matters**:

For a protocol whose core value proposition is "we don't trust, we verify," having an independent security audit is essential. The smart contracts handle real funds — user deposits, host payments, staking collateral — so they must be rigorously vetted for vulnerabilities.

**What Was Audited**:

• **JobMarketplace** — Session creation, escrow deposits, proof-based payment settlement, and timeout handling
• **NodeRegistry** — Host registration, staking, slashing, and pricing
• **ModelRegistry** — Model governance and approval
• **ProofSystem** — Signature verification and proof integration
• **HostEarnings** — Payment accumulation and withdrawal

**Open Source + Audited**:

The contracts are both open source (auditable by anyone on GitHub) and independently audited by a professional security firm. This combination provides the strongest possible assurance — you don't have to take our word for it, and you don't have to audit the code yourself.`,
  },
  {
    id: "general-10",
    question:
      "What is multi-agent orchestration and how does the A2A protocol work?",
    category: "general",
    answer: `**Multi-agent orchestration** allows complex goals to be broken down into sub-tasks and routed to different AI models — all running on decentralised infrastructure with encrypted inference and on-chain settlement.

**The Problem with Single-Model Inference**

Analysing a quarterly earnings report requires extracting metrics, comparing historical performance, researching market context, and drafting a summary — tasks best handled by different models with different strengths. Single-model inference can't optimally handle this.

**How It Works**

The \`@fabstir/orchestrator\` package decomposes complex goals into **Directed Acyclic Graphs (DAGs)** of sub-tasks:

1. **TaskPlanner** — An LLM-driven planner breaks your goal into typed sub-tasks (analysis, synthesis, research, tool-calling, creative)
2. **ModelRouter** — Each sub-task is assigned to the optimal model based on task complexity — deep models for tool-calling and synthesis, fast models for research
3. **TaskQueue** — DAG-aware execution engine respects task dependencies and runs independent tasks in parallel
4. **ProofCollector** — Accumulates cryptographic proof CIDs across all sub-tasks
5. **Synthesis** — Results from all sub-tasks are combined into a final answer

**Orchestration Patterns**

Three built-in patterns cover common workflows:

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **FanOut** | Execute N sub-tasks in parallel | Independent research queries |
| **Pipeline** | Sequential execution, each task receives prior output | Multi-step reasoning |
| **MapReduce** | Parallel map phase, single reduce synthesis | Document analysis |

**Google's Agent-to-Agent (A2A) Protocol**

Platformless AI implements **Google's A2A protocol** (v1.0.0-rc) — an open standard for AI agents to discover, communicate, and collaborate regardless of framework or vendor. Backed by 150+ technology partners and the Linux Foundation.

A2A enables:
• **Agent Cards** (\`/.well-known/agent.json\`) — Agents advertise their capabilities and skills for automatic discovery
• **JSON-RPC 2.0** — Standardised task delegation between agents
• **SSE Streaming** — Real-time progress updates for long-running tasks
• **Skill-based routing** — Clients discover agents by matching skill tags to requirements

Platformless AI is, to our knowledge, the **first DePIN project to implement the A2A protocol** — bridging decentralised compute infrastructure with the emerging standard for inter-agent communication.

**x402 Micropayments for Inter-Agent Delegation**

When agents delegate tasks to external A2A agents, payment is handled via the **x402 HTTP payment protocol** — gasless USDC micropayments using EIP-3009 \`transferWithAuthorization\`. Budget enforcement ensures spending stays within configured limits.

• **Internal inference** (own hosts): Standard escrow via JobMarketplace
• **External A2A delegation** (foreign agents): x402 per-request USDC micropayment

**Status**: The orchestrator is functional with 206 passing tests, but the underlying A2A standard is at release candidate status (v1.0.0-rc, ~11 months old). The implementation will track the specification as it matures toward stable 1.0.`,
  },

  // Users FAQ
  {
    id: "users-1",
    question: "How do I start using Platformless AI?",
    category: "users",
    answer: `Platformless AI is currently in **beta**. Here's how to get started once it launches:

**Step 1: Get a Crypto Wallet**

You'll need an Ethereum-compatible wallet:
• **MetaMask**: Most popular, browser extension (metamask.io)
• **Rainbow Wallet**: Mobile-first, great UX
• **Coinbase Wallet**: If you already use Coinbase

⚠️ **Critical**: Never share your seed phrase with anyone.

**Step 2: Get ETH on Base L2**

You need a small amount of ETH on Base L2 for gas fees (~$0.01 per transaction) and payments.

Options:
• Bridge from Ethereum mainnet via bridge.base.org
• Buy directly on Coinbase and withdraw to Base L2
• Use a faucet for testnet (faucet.quicknode.com)

**Step 3: Visit Platformless AI**

1. Go to platformlessai.com
2. Click "Connect Wallet"
3. Approve the connection (free)

**Step 4: Browse Models & Providers**

Select based on:
• **Price**: Compare rates across providers
• **Latency**: Geographic proximity (lower ping)
• **Reputation**: Provider uptime and completed jobs
• **Model availability**: Which models they're hosting

**Step 5: Start a Conversation**

1. Deposit funds into escrow (e.g., $1)
2. Start chatting
3. Encryption happens automatically
4. Responses stream in real-time

**Step 6: Your Conversations are Saved**

All conversations are:
• Encrypted with your wallet's key
• Stored on S5 decentralized storage
• Accessible anytime you reconnect your wallet

**Developer Path**:

If you're a developer, use the SDK directly:

\`\`\`bash
npm install @fabstir/sdk-core
\`\`\`

See docs at **docs.platformlessai.com** (coming soon) or GitHub README.

**Beta Access**: Join the waitlist on this page. Public beta targets Q1 2026.`,
  },
  {
    id: "users-2",
    question: "What AI models are available?",
    category: "users",
    answer: `Platformless AI supports **open-weight models** in GGUF format that GPU providers choose to host. Unlike closed platforms, model availability is determined by the decentralized marketplace.

**Currently Available (Beta)**:
• **TinyLlama 1.1B**: Ultra-fast, efficient, good for simple tasks
• **TinyVicuna 1B**: Similar performance, optimized for chat

**Coming Soon (Post-Beta)**:

**7B Parameter Models**:
• Mistral 7B: High-quality, excellent reasoning
• Llama 3 8B: Strong performance, versatile
• Gemma 7B: High-quality open model

**13B+ Parameter Models**:
• Llama 3 70B: High-quality, advanced reasoning
• Mixtral 8x7B: Mixture-of-experts model
• Qwen 2.5 72B: Multilingual, strong performance

**Specialized Models**:
• Code models: CodeLlama, StarCoder
• Multilingual: BLOOM, mGPT
• Uncensored variants: Without RLHF safety tuning

**Model Governance**: Models must be approved by the ModelRegistry smart contract before providers can host them. This prevents malicious models, copyright infringement, and impersonation.

Approval process:
1. Community proposes a model (name + hash)
2. Governance vote (FAB token holders)
3. If approved, model added to registry
4. Providers can stake and host it

**Future Multi-Modal Support**:
• Image generation: Stable Diffusion, FLUX
• Vision models: LLaVA
• Audio/TTS: Whisper, Bark, Coqui

**Why GGUF Format?** Optimized for efficient CPU/GPU inference, supports quantization (4-bit, 5-bit, 8-bit), fast loading, and cross-platform compatibility.

**Pricing Varies by Model**: Larger models cost more per token due to higher compute requirements. Providers set their own competitive rates.`,
  },
  {
    id: "users-3",
    question: "How does Platformless AI pricing compare to other platforms?",
    category: "users",
    answer: `Platformless AI offers **competitive market-driven pricing** with transparent, direct costs - no hidden platform markup.

**Current Pricing Comparison** (per 1M tokens):

**Small Models (1-3B parameters)**:

| Provider | Model | Input | Output |
|----------|-------|-------|--------|
| **Platformless AI** | **1B models** | **$0.03-0.05** | **$0.03-0.05** |
| Google | Gemini 2.0 Flash | $0.10 | $0.40 |
| OpenAI | GPT-4.1 nano | $0.10 | $0.40 |
| Google | Gemini 1.5 Flash-8B | $0.0375 | $0.15 |

**Medium Models (7-13B parameters)**:

| Provider | Model | Input | Output |
|----------|-------|-------|--------|
| **Platformless AI** | **7B models** | **$0.08-0.15** | **$0.08-0.15** |
| Groq | Llama 3.1 8B | $0.05 | $0.08 |
| Together AI | Qwen 2.5 7B | $0.30 | $0.30 |
| Anthropic | Claude Haiku 4.5 | $1.00 | $5.00 |
| Anthropic | Claude Sonnet 4.5 | $3.00 | $15.00 |

**Large Models (70B+ parameters)**:

| Provider | Model | Input | Output |
|----------|-------|-------|--------|
| **Platformless AI** | **70B models** | **$0.40-0.70** | **$0.40-0.70** |
| Groq | Llama 3.3 70B | $0.59 | $0.79 |
| Together AI | Llama 70B variants | $0.54-0.90 | $0.54-0.90 |
| Anthropic | Claude Opus 4.1 | $15.00 | $75.00 |
| OpenAI | GPT-4 Turbo | $10.00 | $30.00 |

**Why Competitive Pricing?**

✅ **No Platform Overhead**: No company infrastructure to fund
✅ **Market-Driven**: Providers compete on price
✅ **Transparent**: See exact GPU costs, no hidden markup
✅ **Direct P2P**: Users pay providers directly via smart contracts
✅ **10% Network Fee Only**: Goes to protocol treasury for development

**Additional Cost Savings**:

• **No Subscriptions**: Pay only for what you use
• **No Minimums**: Start with any amount
• **No Rate Limits**: Based on availability, not arbitrary caps
• **No API Key Fees**: Wallet-based authentication

**Gas Fees**: Base L2 transactions cost ~$0.01-0.02 per session (negligible)

**Real-World Example**:

Customer Support Bot (10,000 queries/day, avg 500 tokens):
• High-end platform: ~$2,250/month
• Platformless AI (7B): ~$120-225/month
• **Savings**: $2,000+/month

**The Platformless Advantage**: Beyond competitive pricing, you get privacy, censorship-resistance, no vendor lock-in, and true decentralization. The value proposition isn't just cost - it's **control**.`,
  },
  {
    id: "users-4",
    question: "Do I need crypto/wallet to use this?",
    category: "users",
    answer: `**Yes, currently.** Platformless AI requires:
1. An Ethereum-compatible wallet (MetaMask, Rainbow, etc.)
2. ETH or USDC on Base L2 (for payments and gas fees)

**Why a Wallet is Required**:

• **Authentication**: Your wallet is your identity. No usernames/passwords.
• **Payments**: Smart contracts need to know where to deduct funds and refund deposits.
• **Encryption Keys**: Your wallet's private key generates encryption keys for conversations.
• **Proof of Ownership**: Only you can access your encrypted history (tied to wallet).
• **Decentralization**: Wallets enable true peer-to-peer interaction without accounts.

**Do I Need to Be a "Crypto Expert"?**

**No.** Basic wallet usage is simple:
1. Install MetaMask (5 minutes)
2. Buy $10-20 of ETH on Coinbase
3. Withdraw to MetaMask on Base L2
4. Connect wallet to Platformless AI

Most users learn this in **under 30 minutes**.

**Future: Fiat On-Ramp** (post-MVP):
• Credit card purchases: Buy ETH/USDC directly in UI
• Gasless transactions: Smart wallets that sponsor gas
• Email-based wallets: Privy, Magic Link (wallet in background)

These features will make onboarding easier while maintaining the platformless benefits.

**Privacy Considerations**:

Crypto wallets are **pseudonymous**. Your address isn't directly tied to identity (no KYC), but if you buy crypto on Coinbase, your address can be linked.

**For maximum privacy**:
1. Buy crypto with cash (LocalBitcoins, Bitcoin ATM)
2. Use privacy coin (Monero) to swap for ETH
3. Create fresh wallet for Platformless AI (not used elsewhere)

**Why This Matters**:

The wallet requirement is **fundamental to platformless architecture**:
• Enables trustless smart contract payments
• Provides cryptographic identity without accounts
• Allows self-custody of encrypted data
• Eliminates single points of failure

Traditional platforms make onboarding easier but sacrifice privacy, censorship-resistance, and user control. Platformless AI chooses **user sovereignty** over convenience.

**Beta Testing Without Real Funds**: Experiment on Base Sepolia testnet with free test ETH from faucet.`,
  },
  {
    id: "users-5",
    question: "What if I need help or have issues?",
    category: "users",
    answer: `Platformless AI is open-source and community-driven. Here's how to get help:

**1. Documentation** (First Stop)
• docs.platformlessai.com (coming soon)
• Getting started guide, troubleshooting, SDK API reference

**2. Discord Community** (Real-Time Help)
• #support channel: Ask questions, get help
• #general: Discuss the project
• #developers: Technical discussions
• Typical response time: Under 1 hour

**3. GitHub Issues** (Bug Reports)
• github.com/Fabstir
• Report bugs with error messages, browser/OS version, transaction hash

**4. Email Support** (Sensitive Issues)
• support@fabstir.com
• Response time: 24-48 hours

**Common Issues & Quick Fixes**:

**"Wallet won't connect"**:
✅ Make sure you're on Base L2 network (not Ethereum mainnet)
✅ Refresh the page
✅ Disable other wallet extensions

**"Transaction failed"**:
✅ Check you have enough ETH for gas (~$0.02)
✅ Try increasing gas limit in MetaMask
✅ Wait 30 seconds and retry

**"Model not responding"**:
✅ Check GPU provider status (may be offline)
✅ Try a different provider
✅ Check Discord for network status updates

**"Conversations not loading"**:
✅ Verify you're connected with the same wallet
✅ Check S5 network status
✅ Try exporting conversations (backup feature)

**What We DON'T Have** (vs. Traditional Platforms):
❌ Phone support, live chat, SLA guarantees, refund department

**What We DO Have**:
✅ Transparent on-chain data (verify everything)
✅ Open-source code (audit, fork, fix bugs)
✅ Active community (users helping each other)
✅ Developer-friendly SDK and docs

**Emergency Situations**:
• Security issue: security@fabstir.com (bug bounty available)
• Smart contract bug: Discord @core-team immediately
• Lost funds: Check BaseScan to trace transactions

**The Platformless Support Model**: As a decentralized system, support comes from the community rather than a centralized company. This means peer-to-peer help, open-source transparency, and collective problem-solving. While different from traditional support, it empowers users and eliminates dependence on corporate customer service.`,
  },
  {
    id: "users-6",
    question:
      "Can I use my existing AI tools like Claude Code, Cursor, or LangChain?",
    category: "users",
    answer: `**Yes.** Platformless AI is designed to work with the tools you already use — no custom clients needed.

**Anthropic-compatible tools (via Claude Bridge)**

The Claude Bridge translates the full Anthropic Messages API into the protocol's encrypted layer. Tools that speak the Anthropic API work out of the box:

• **Claude Code** — Anthropic's autonomous coding agent, validated with all 23 of its tools including file operations (Read, Edit, Write, Glob, Grep), terminal (Bash), web access (WebFetch, WebSearch), and planning tools
• **Cursor** — AI-powered code editor, connects via the Claude Bridge endpoint

Just point the tool's \`baseURL\` to your local Claude Bridge and it handles host discovery, encryption, and session management automatically.

**OpenAI-compatible tools (via OpenAI Bridge)**

The OpenAI Bridge does the same for the OpenAI Chat Completions API:

• **OpenCode** — Production-validated running GLM-4.7-Flash on decentralised hosts, including image generation
• **Continue** — Open-source AI coding assistant
• **LangChain** — AI application framework for building pipelines and agents

Set \`OPENAI_BASE_URL\` to your local bridge endpoint and everything works.

**Agentic AI Support**

Both bridges handle the full **multi-turn tool-use loop** that autonomous agents need:
• Agent sends a message, model responds with a tool call
• Bridge translates the model's output into the correct API format
• Client executes the tool and sends results back
• Model receives the observation and continues planning

This means AI agents can execute dozens of tool calls per session — reading files, running commands, searching the web, and editing code — all running on decentralised GPU infrastructure.`,
  },
  {
    id: "users-7",
    question:
      "Can I build apps that search the web or query my own documents?",
    category: "users",
    answer: `**Yes.** Platformless AI supports both web search and retrieval-augmented generation (RAG) as built-in capabilities.

**Web Search**

Hosts can enable web search integration with three supported providers:
• **Brave Search**
• **Bing**
• **DuckDuckGo**

When your AI agent or application needs live information, it can use web search tools through the same encrypted session. This is already validated as part of the agentic AI workflow — Claude Code's WebSearch and WebFetch tools work through the Claude Bridge on decentralised hosts.

**RAG / Vector Search**

For querying your own documents, the SDK provides a \`VectorRAGManager\`:

• **Host-side embeddings** — Your documents are embedded on the host's GPU, so you don't need your own embedding infrastructure
• **Vector databases on S5** — Embeddings are stored on decentralised storage under your control, encrypted with your keys
• **Encrypted queries** — RAG queries flow through the same end-to-end encrypted channel as all other inference traffic

This means you can build applications that answer questions from your private knowledge base — contracts, technical docs, support tickets — without sending unencrypted documents to a centralised platform.

**Privacy Advantage**

Unlike centralised RAG services where the platform can see your documents and queries, Platformless AI keeps everything encrypted. The host processes your embeddings and queries but the data is encrypted in transit and at rest on S5. Only you hold the decryption keys.`,
  },
  {
    id: "users-8",
    question:
      "How does Platformless AI choose which GPU provider handles my request?",
    category: "users",
    answer: `The SDK uses a **weighted scoring algorithm** to rank available hosts, with five selection modes that let you prioritise what matters most.

**How Host Discovery Works**

1. The SDK queries the \`NodeRegistry\` smart contract to find all hosts supporting your chosen model
2. Each host is scored using four weighted factors
3. The highest-scoring host is selected for your session

**Scoring Factors**

• **Stake (35% default)** — How much FAB the host has staked; higher stakes signal commitment
• **Price (30% default)** — Inverse of the host's pricing; lower prices score higher
• **Uptime (20% default)** — Host availability and reliability
• **Latency (15% default)** — Network round-trip time; lower is better

**Five Selection Modes**

• **AUTO** — Uses the default balanced weights above. Best for most users.
• **CHEAPEST** — Shifts to 70% price weight. Prioritises the lowest-cost host, ideal for batch processing or cost-sensitive workloads.
• **RELIABLE** — Shifts to 50% stake + 40% uptime weight. Prioritises hosts with the most skin in the game and best track record. Good for production applications.
• **FASTEST** — Shifts to 60% latency weight. Prioritises the lowest-latency host. Best for real-time interactive use.
• **SPECIFIC** — Bypasses scoring entirely and connects to a host address you specify. Useful if you run your own host or have a trusted provider.

**No Lock-In**

You can change your selection mode per session. Use CHEAPEST for background batch jobs, FASTEST for interactive chat, and RELIABLE for production APIs — all without changing your code beyond a single config option.`,
  },

  // Hosting FAQ
  {
    id: "hosting-1",
    question: "How do I become a GPU provider?",
    category: "hosting",
    answer: `Becoming a GPU provider allows you to monetize spare GPU compute by running AI models for users.

**Prerequisites**:

**Hardware**:
• GPU: NVIDIA with ≥8GB VRAM (RTX 3060 minimum, RTX 4090 ideal)
• RAM: ≥16GB (32GB+ recommended)
• Storage: ≥100GB free SSD space
• Internet: Stable ≥50 Mbps upload

**Software**:
• Docker
• NVIDIA CUDA 12.0+ drivers
• Ethereum wallet with private key

**Step-by-Step Setup**:

1. **Install Fabstir LLM Node**
\`\`\`bash
wget https://github.com/Fabstir/releases/fabstir-llm-node-v8.1.2.tar.gz
sha256sum fabstir-llm-node-v8.1.2.tar.gz
tar -xzf fabstir-llm-node-v8.1.2.tar.gz
cd fabstir-llm-node
\`\`\`

2. **Download AI Model** (based on GPU):
• 8GB VRAM: TinyLlama
• 16GB VRAM: Mistral 7B
• 24GB+ VRAM: Llama 3 70B

3. **Configure Environment** (create .env file with wallet keys, model path, pricing)

4. **Register On-Chain**:
\`\`\`bash
./fabstir-host-cli register --model "Mistral-7B" --stake 100 --price 150
\`\`\`

5. **Start the Node**:
\`\`\`bash
docker run -d --gpus all --name fabstir-node --env-file .env -p 8080:8080 fabstir-llm-node:latest
\`\`\`

6. **Verify**:
\`\`\`bash
curl http://localhost:8080/health
\`\`\`

**Expected Earnings** (example):
• RTX 4090 running Mistral 7B
• 95% uptime
• Competitive pricing
• **Est. $150-400/month** (depends on demand)

**Competitive Pricing Strategy**: 
• Research current market rates
• Price competitively while covering costs
• Higher uptime = more job assignments
• Build reputation for consistent service

**Support**: Join Discord #hosting channel for setup help, optimization tips, and earnings discussions.`,
  },
  {
    id: "hosting-2",
    question: "What hardware do I need?",
    category: "hosting",
    answer: `GPU requirements vary by model size:

**Minimum (Entry-Level)**:
• GPU: NVIDIA RTX 3060 (12GB VRAM)
• Can run: 1B-3B parameter models
• Performance: ~50 tokens/sec
• Est. earnings: $50-100/month
• RAM: 16GB, Storage: 100GB SSD, Internet: 50 Mbps upload
• Power: 650W PSU

**Recommended (Mid-Tier)**:
• GPU: RTX 4070 Ti (12GB) or RTX 3090 (24GB)
• Can run: 7B-13B parameter models (Mistral 7B, Llama 3 8B)
• Performance: ~150 tokens/sec
• Est. earnings: $150-400/month
• RAM: 32GB, Storage: 500GB NVMe SSD, Internet: 100 Mbps
• Power: 850W PSU

**Optimal (High-End)**:
• GPU: RTX 4090 (24GB) or A100 (40GB)
• Can run: 13B-70B parameter models (Llama 3 70B)
• Performance: ~300 tokens/sec (RTX 4090), ~500 tokens/sec (A100)
• Est. earnings: $400-1200/month
• RAM: 64GB+ DDR5, Storage: 1TB+ NVMe SSD, Internet: 500 Mbps+
• Power: 1000W+ PSU

**GPU Comparison**:

| GPU | VRAM | Max Model | Tokens/Sec | Power | Monthly $ |
|-----|------|-----------|------------|-------|-----------|
| RTX 3060 | 12GB | 3B (Q4) | ~50 | 170W | $50-100 |
| RTX 3090 | 24GB | 13B (Q4) | ~120 | 350W | $100-250 |
| RTX 4090 | 24GB | 70B (Q4) | ~300 | 450W | $300-800 |
| A100 | 40GB | 70B (Q4) | ~500 | 400W | $600-1500 |

**Why NVIDIA Only?** Requires CUDA and Risc0 CUDA acceleration for STARK proofs. AMD/Intel support planned for future releases.

**Multiple GPUs?** Yes - run multiple nodes on different ports, register each separately, multiply your earnings.

**Cloud GPU Options**: Rent GPUs from Vast.ai (~$0.40/hr for RTX 4090) or RunPod (~$1.00/hr for A100) if you don't own hardware. Profitability depends on market demand and your pricing.

**Profitability Factors**:
• Competitive pricing
• High uptime (99%+)
• Low latency location
• Reputation score
• Market demand for your models`,
  },
  {
    id: "hosting-3",
    question: "How do I get paid for hosting models?",
    category: "hosting",
    answer: `Payment is **automatic and trustless** via smart contracts. No invoices, no delays, no middleman.

**Payment Flow**:

1. **User Creates Job**: User deposits funds into smart contract escrow
2. **Job Assignment**: Smart contract assigns job to you based on model, price, reputation
3. **Inference**: You process encrypted prompts and generate responses
4. **Proof Generation**: Every 1000 tokens, you generate a STARK proof proving computation
5. **Proof Submission**: Proof (~221KB) stored on S5, hash submitted to blockchain
6. **Verification**: Smart contract verifies proof hash
7. **Payment Release**: Payment automatically released to your wallet
8. **Withdraw**: Accumulated earnings withdrawable anytime

**Payment Rates** (You Set):

Competitive market pricing:
• **1B models**: ~$0.03-0.05 per 1M tokens
• **7B models**: ~$0.08-0.15 per 1M tokens
• **70B models**: ~$0.40-0.70 per 1M tokens

**Fee Structure**:
• **You receive**: 90% of user payment
• **Network fee**: 10% to protocol treasury
• **Gas costs**: ~$0.005 per proof submission (Base L2)

**When Do I Get Paid?**

Payments release **immediately** after proof verification (~2-5 seconds on Base L2).

**Withdrawing Earnings**:

\`\`\`bash
./fabstir-host-cli withdraw --amount 50.0
# Withdraws 50 USDC to your wallet
\`\`\`

**Payment Tokens**: Accept ETH, USDC, or FAB tokens (configured in your node).

**Earnings Example** (Mistral 7B at $0.10 per 1M tokens):
• 500,000 tokens/day processed
• $50/day = $1,500/month
• Minus electricity (~$50) and depreciation (~$100)
• **Net: ~$1,350/month**

**Maximizing Earnings**:
• Competitive pricing (monitor market rates)
• High uptime (99%+)
• Fast inference (better GPU)
• Multiple models (capture more demand)
• Low-latency location (faster response times)

**The Platformless Advantage**: Direct peer-to-peer payments. No platform taking 20-40% cut. No payment delays. Full transparency on-chain.`,
  },
  {
    id: "hosting-4",
    question: "What are the staking requirements?",
    category: "hosting",
    answer: `**Staking is required to become a GPU provider.** This ensures hosts are committed and deters malicious behavior.

**Minimum Stake**: 1000 FAB tokens

**Why Staking is Required**:

• **Sybil Resistance**: Prevents spam registrations
• **Quality Assurance**: Only serious providers stake capital
• **Slashing Mechanism**: Lose stake if you misbehave
• **Reputation Signal**: Higher stakes = higher trust = more jobs

**Stake Tiers**:

| Stake Amount | Benefits | Risk |
|--------------|----------|------|
| **1000 FAB** (min) | Can register, basic priority | Standard slashing risk |
| **2500 FAB** | +10% job priority | Larger potential loss |
| **5000 FAB** | +25% job priority, "Verified" badge | Significant capital at risk |
| **10000 FAB** | +50% job priority, featured in UI | Major capital at risk |

**How to Stake**:

1. **Acquire FAB tokens**: Buy on Uniswap (Base L2)
2. **Register**:
\`\`\`bash
./fabstir-host-cli register --model "Mistral-7B" --stake 1000
\`\`\`
3. **Tokens Locked**: While you're an active host

**Slashing Conditions** (Lose Stake):

❌ Submit fraudulent STARK proofs
❌ Excessive downtime without unregistering
❌ Fail to respond to accepted jobs
❌ Attempt to decrypt user data

**Slashing is RARE** - designed only for malicious actors, not honest mistakes.

**Slashing Safeguards**:

• **Maximum 50% slash per action** — You cannot lose your entire stake from a single dispute
• **24-hour cooldown** between slashes on the same host
• **Evidence CID required** — Every slash must include public, verifiable evidence
• **Minimum stake floor (100 FAB)** — If a slash would drop you below this, your node auto-unregisters

**Unstaking Process**:

\`\`\`bash
./fabstir-host-cli unregister
# 7-day cooldown period begins
# After 7 days, stake automatically returned
\`\`\`

**Why 7 Days?** Allows time for dispute resolution before funds are released.

**Increasing Stake**:

\`\`\`bash
./fabstir-host-cli stake-more --amount 1500
# Increases from 1000 → 2500 FAB
\`\`\`

**Where to Get FAB Tokens**:
• Uniswap (Base L2): Swap ETH → FAB
• Earn as user: 5% cashback rewards in FAB
• Liquidity mining: Provide FAB/ETH liquidity

**ROI Consideration**: Your stake is refundable capital (not a sunk cost). Higher stakes earn more through priority job assignments, often recovering the larger stake investment through increased earnings.`,
  },
  {
    id: "hosting-5",
    question: "How are payments settled?",
    category: "hosting",
    answer: `Payments are settled **automatically and trustlessly** via smart contracts on Base L2. Zero manual processing.

**Settlement Process**:

1. **Job Creation**: User deposits funds into escrow
2. **Job Acceptance**: Your node accepts (or smart contract assigns)
3. **Inference**: You process encrypted prompts
4. **Proof Checkpoints**: Every 1000 tokens, generate STARK proof
   • Proof proves computation occurred correctly
   • Uploaded to S5 decentralized storage (~221KB)
   • Hash (32 bytes) submitted to blockchain
5. **Verification**: Smart contract verifies proof hash matches S5 data
6. **Payment Release**: If valid, payment released from escrow
   • Proportional to tokens processed
   • Sent directly to your wallet
   • ~2-5 seconds to settle on Base L2
7. **Remaining Escrow**: Unused funds refunded to user

**Why STARK Proofs?**

Cryptographic evidence that you:
• Actually ran the AI model
• Processed the correct token count
• Did the work honestly

Smart contracts verify proofs without trusting you or the user.

**Settlement Speed**:

• **Per-checkpoint**: 1000 tokens = ~2-10 seconds (proof gen + settlement)
• **Final settlement**: Job completes → remaining payment → immediate

**Gas Costs**: ~$0.005 per proof submission (Base L2)

**Dispute Resolution**:

If user claims incorrect processing:
• Smart contract checks STARK proof
• Proof is mathematically verifiable
• Invalid proof = no payment + slashing risk
• Valid proof = you get paid, complaint dismissed

**Multi-Currency Support**: Accept ETH, USDC, or FAB tokens

**No Chargebacks**: Blockchain payments are irreversible. Once received, it's final.

**Transparency**: All payments publicly verifiable on BaseScan. See every transaction, proof submission, and earnings in real-time.

**The Platformless Advantage**:

• ⚡ Instant settlement (~10 seconds work → payment)
• 🔒 Trustless (smart contracts, no middleman)
• 🌍 Transparent (all payments visible on-chain)
• 💰 Cheap (gas fees <$0.01 per transaction)
• 🛡️ Secure (cryptographic proofs + slashing for fraud)

Unlike traditional platforms that take 30-90 days to pay and charge 20-40% fees, Platformless AI settles **immediately** with only a 10% network fee.`,
  },
  {
    id: "hosting-6",
    question:
      "Can I host image generation or vision models alongside text?",
    category: "hosting",
    answer: `**Yes.** Hosts can run optional service sidecars alongside their main LLM inference engine to offer image generation, vision, and OCR capabilities.

**Image Generation (FLUX.2 Sidecar)**

The **FLUX.2 diffusion model** runs as a sidecar process on your GPU alongside the LLM. When a user requests image generation — either through natural language, the OpenAI Images API, or the direct SDK call — your node routes the request to the FLUX.2 sidecar and returns the generated image through the same encrypted WebSocket channel.

**Vision (Florence-2)**

**Florence-2** handles image understanding tasks — captioning, visual question answering, and scene analysis. When clients send base64-encoded images via the OpenAI vision message format, your node passes them to Florence-2 for processing.

**OCR (PaddleOCR)**

**PaddleOCR** extracts text from images, enabling document processing and screenshot analysis for users.

**Hardware Considerations**

Running sidecars alongside an LLM increases GPU memory usage:
• **FLUX.2** requires additional VRAM for the diffusion model weights and image tensors
• **Florence-2** and **PaddleOCR** are lighter but still consume GPU memory
• A 24GB+ VRAM card (RTX 4090 or A100) is recommended if you want to host multiple services simultaneously
• With 12GB VRAM, you may need to choose between a larger LLM or running sidecars with a smaller text model

**Earnings Potential**

Offering image generation and vision services differentiates your node from text-only hosts. Image generation jobs typically consume more compute per request, which means higher per-job earnings.`,
  },
  {
    id: "hosting-7",
    question: "What is RAG hosting and how do I offer it?",
    category: "hosting",
    answer: `**RAG (Retrieval-Augmented Generation) hosting** lets your node process user documents and answer questions from their private knowledge bases — a high-value service beyond basic chat.

**How It Works**

Your node runs two additional components:

• **Embeddings model** — Converts user documents into vector embeddings on your GPU. The host handles the compute-intensive embedding process so users don't need their own infrastructure.
• **Vector database sidecar** — Stores and queries the resulting embeddings. When a user asks a question, your node searches their vector database for relevant document chunks and feeds them as context to the LLM.

**Setup**

RAG hosting is an optional service in the Fabstir Node stack. You enable it in your node configuration alongside your LLM. The SDK's \`VectorRAGManager\` handles the client-side interaction, and your node processes the embedding and retrieval operations.

**Privacy**

All RAG data — documents, embeddings, and queries — flows through the same end-to-end encrypted channel as text inference. User vector databases are stored encrypted on S5 decentralised storage under the user's control. Your node processes the data but does not retain unencrypted copies.

**Earnings Potential**

RAG hosting is a premium service. Enterprise users building AI-powered products — internal knowledge bases, customer support bots, document analysis tools — need reliable RAG infrastructure. Offering this capability positions your node for higher-value workloads compared to simple chat inference. You earn on both the embedding computation and the augmented inference queries.`,
  },
  {
    id: "hosting-8",
    question: "What happens if a user disputes a job I completed?",
    category: "hosting",
    answer: `Platformless AI uses a **two-layer dispute resolution** system designed to protect honest hosts while holding bad actors accountable.

**Layer 1: On-Chain (Automatic, Cryptographic)**

Every session generates an immutable evidence trail stored on-chain and on S5 decentralised storage:

• **proofHash** — Cryptographic fingerprint recorded on-chain
• **proofCID** — Complete proof data stored on S5
• **deltaCID** — Incremental computation changes stored on S5
• **conversationCID** — Full conversation at session completion
• **signature** — Your ECDSA attestation of the work performed

Anyone can verify your work: download the CID content from S5, hash it, compare to the on-chain proofHash, verify the signature, and count actual tokens vs claimed tokens. Valid proofs are mathematically irrefutable.

**Layer 2: Off-Chain (Human-Judged, DAO-Governed)**

If a user believes they were overcharged or received poor service:
1. User downloads conversation and proofs using the stored CIDs
2. User compares claimed tokens vs actual content
3. User submits a dispute to the DAO with CID evidence
4. DAO members review the evidence and vote
5. If the host is found guilty, the DAO calls \`slashStake()\` with a public evidence CID and reason

**Slashing Protections (Safeguards for Hosts)**

The protocol includes strong protections against unfair or abusive slashing:

• **Maximum 50% slash per action** — You cannot lose your entire stake from a single dispute
• **24-hour cooldown** between slashes on the same host — Prevents rapid-fire attacks
• **Evidence CID required** — Every slash must include public, verifiable evidence
• **All slashes emit public events** — Full transparency on the blockchain
• **Minimum stake floor (100 FAB)** — If a slash would drop you below this, your node auto-unregisters rather than operating in a vulnerable state

**No Fund Lockup**

Sessions always settle or time out — there is no on-chain dispute state that can lock your earnings indefinitely. This is a deliberate design choice to prevent griefing attacks where a malicious user could freeze your funds with a baseless claim.

**Bottom Line**: If you run your node honestly, the cryptographic proofs protect you. Invalid complaints are dismissed because the math doesn't lie.`,
  },
];

export const categoryNames = {
  general: "General FAQ",
  users: "Users",
  hosting: "Hosting",
} as const;
