export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'users' | 'hosting';
}

export const faqData: FAQItem[] = [
  // General FAQ
  {
    id: 'general-1',
    question: 'What is Platformless AI?',
    category: 'general',
    answer: `Platformless AI is a decentralized peer-to-peer network for accessing AI models without trusting a centralized company.

When you use traditional AI platforms, you're forced to:
• Trust them with your private data
• Accept their content moderation policies
• Pay their markup prices
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
    id: 'general-2',
    question: 'Why "platformless"?',
    category: 'general',
    answer: `The word "platformless" captures what makes this approach fundamentally different from traditional AI services.

**The Problem with Platforms**:

Every major AI service today is a **platform** - a centralized company that sits between you and the AI models. This creates several problems:

• **Trust Requirement**: You must trust the platform won't misuse your data, leak your prompts, or train models on your private conversations.
• **Censorship**: Platforms decide what questions you can ask and what answers you receive.
• **Single Point of Failure**: If the platform goes down, changes its terms, raises prices, or bans your account - you have no recourse.
• **Markup Pricing**: Platforms add significant margins on top of compute costs.
• **Deplatforming Risk**: Your access can be revoked at any time, for any reason.

**Why "Platformless" Works**:

Platformless AI replaces the centralized platform with smart contracts for coordination, P2P connections for model access, end-to-end encryption for privacy, and decentralized storage for conversation history.

The infrastructure is platformless - no company controls it, no middleman extracts rent, no gatekeeper decides who can participate.`,
  },
  {
    id: 'general-3',
    question: 'How does it work?',
    category: 'general',
    answer: `Platformless AI coordinates AI inference through smart contracts, peer-to-peer networking, and cryptographic proofs. Here's the end-to-end flow:

1. **Discovery Phase**: Browse available models and GPU providers via the SDK. Smart contracts track which providers are online and their pricing.

2. **Payment & Job Creation**: Deposit funds (ETH, USDC, or FAB tokens) into a smart contract escrow. A "job" is created on-chain.

3. **Encrypted Session Initialization**: Your device generates a unique encryption key for this session using XChaCha20-Poly1305 AEAD.

4. **Inference Request**: Your prompt is encrypted on your device before leaving. Sent directly to the GPU provider via WebSocket.

5. **Model Inference**: Provider decrypts the prompt, generates a response, and encrypts it before sending back.

6. **Proof of Work**: Every 1000 tokens, the provider generates a STARK proof proving computation occurred. Proof is stored on S5 decentralized storage.

7. **Payment Settlement**: Smart contract verifies the proof and automatically releases payment from escrow to the provider.

8. **Storage**: Your encrypted conversation is stored on S5 decentralized storage. You can retrieve it later using your private key.

**Key Technologies**: Base L2, Smart Contracts, STARK Proofs (Risc0), S5 Storage, XChaCha20-Poly1305 encryption, WebSocket.`,
  },
  {
    id: 'general-4',
    question: 'Is my data private?',
    category: 'general',
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

**What This Doesn't Protect**:

❌ Your Device: If compromised with malware, encryption can't help
❌ GPU Provider Metadata: Providers know your IP, session duration, token count
❌ Blockchain Metadata: Transaction history (job IDs, payment amounts) is public

**Performance Impact**: Negligible - session initialization takes ~10ms, per-message encryption/decryption <1ms.`,
  },
  {
    id: 'general-5',
    question: 'What makes this different from traditional AI platforms?',
    category: 'general',
    answer: `The fundamental difference is **who controls your AI experience**: a centralized company vs. trustless smart contracts.

**Key Differences**:

| Feature | Traditional Platforms | Platformless AI |
|---------|----------------------|----------------|
| **Data Privacy** | Company sees all | End-to-end encrypted |
| **Censorship** | Platform filters content | Censorship-resistant |
| **Account Control** | Can ban you anytime | Wallet-based, no accounts |
| **Pricing** | Platform sets prices + markup | Market-driven (80% cheaper) |
| **Model Access** | Limited to approved models | Any open-weight model |
| **Trust Model** | Must trust company | Cryptographic proofs |
| **Verification** | Closed source | Open source, audit everything |

**Who Should Use Platformless AI?**

✅ Privacy-conscious users: Journalists, lawyers, healthcare professionals
✅ Researchers: Sensitive topics, controversial questions
✅ Businesses: Proprietary data that can't be sent to third parties
✅ Developers: Building without vendor lock-in
✅ Crypto natives: Already have wallets, value trustlessness

**Bottom Line**: Traditional platforms optimize for convenience. Platformless AI optimizes for privacy, censorship-resistance, and trustlessness.`,
  },

  // Users FAQ
  {
    id: 'users-1',
    question: 'How do I start using Platformless AI?',
    category: 'users',
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

Select based on price, latency, and reputation.

**Step 5: Start a Conversation**

1. Deposit funds into escrow (e.g., $1)
2. Start chatting
3. Encryption happens automatically

**Beta Access**: Join the waitlist on this page. Public beta targets Q1 2025.`,
  },
  {
    id: 'users-2',
    question: 'What AI models are available?',
    category: 'users',
    answer: `Platformless AI supports **open-weight models** in GGUF format that GPU providers choose to host.

**Currently Available (Beta)**:
• **TinyLlama 1.1B**: Ultra-fast, cheap, good for simple tasks
• **TinyVicuna 1B**: Similar performance, optimized for chat

**Coming Soon (Post-Beta)**:

**7B Parameter Models**:
• Mistral 7B: High-quality, excellent reasoning
• Llama 3 8B: Strong performance, versatile
• Gemma 7B: High-quality open model

**13B+ Parameter Models**:
• Llama 3 70B: High-quality, advanced reasoning
• Mixtral 8x7B: Mixture-of-experts model

**Specialized Models**:
• Code models: CodeLlama, StarCoder
• Multilingual: BLOOM, mGPT
• Uncensored variants: Without RLHF safety tuning

**Model Governance**: Models must be approved by the ModelRegistry smart contract before providers can host them. Community proposes, FAB token holders vote.

**Future Multi-Modal Support**:
• Image generation: Stable Diffusion, FLUX
• Vision models: LLaVA
• Audio/TTS: Whisper, Bark

**Pricing by Model Size**:
• 1B models: ~$0.0001 per 1K tokens
• 7B models: ~$0.001 per 1K tokens
• 70B models: ~$0.01 per 1K tokens

Still **80% cheaper than traditional platforms** due to no platform markup.`,
  },
  {
    id: 'users-3',
    question: 'Is this cheaper than traditional AI platforms?',
    category: 'users',
    answer: `**Yes - up to 80% cost reduction** by eliminating platform markup.

**Price Comparison** (per 1M tokens):

| Service | Input | Output |
|---------|-------|--------|
| Traditional Platform A | $30.00 | $60.00 |
| Traditional Platform B | $15.00 | $75.00 |
| Traditional Platform C | $0.50 | $1.50 |
| **Platformless AI (7B)** | **$0.10-$0.20** | **$0.10-$0.20** |
| **Platformless AI (70B)** | **$1.00-$2.00** | **$1.00-$2.00** |

**Why So Much Cheaper?**

Traditional platforms add massive markup for infrastructure, salaries, marketing, and profit. They pay ~$0.05-$0.10 per 1M tokens for compute, then charge $30-$75. **That's a 300-750x markup.**

Platformless AI:
✅ No platform to fund (smart contracts are code, not employees)
✅ Providers compete on price (marketplace dynamics)
✅ Users pay only compute cost + 5% network fee

**Real-World Examples**:

**Customer Support Bot** (10,000 queries/day):
• Traditional Platform: $2,250/month
• Platformless AI (7B): $450/month
• **Savings: $1,800/month**

**Code Assistant** (1,000 completions/day):
• Traditional Platform: $9,000/month
• Platformless AI (70B): $1,800/month
• **Savings: $7,200/month**

**Additional Costs**: Gas fees on Base L2 (~$0.02 per session) are negligible.

**No Hidden Fees**: No subscriptions, minimums, rate limits, or API key fees.`,
  },
  {
    id: 'users-4',
    question: 'Do I need crypto/wallet to use this?',
    category: 'users',
    answer: `**Yes, currently.** Platformless AI requires:
1. An Ethereum-compatible wallet (MetaMask, Rainbow, etc.)
2. ETH or USDC on Base L2 (for payments and gas fees)

**Why a Wallet is Required**:

• **Authentication**: Your wallet is your identity. No usernames/passwords.
• **Payments**: Smart contracts need to know where to deduct funds and refund deposits.
• **Encryption Keys**: Your wallet's private key generates encryption keys for conversations.
• **Proof of Ownership**: Only you can access your encrypted history (tied to wallet).

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
• Email-based wallets: Privy, Magic Link

**Privacy Considerations**:

Crypto wallets are **pseudonymous**. Your address isn't directly tied to identity (no KYC), but if you buy crypto on Coinbase, your address can be linked.

**For maximum privacy**:
1. Buy crypto with cash
2. Use privacy coin to swap for ETH
3. Create fresh wallet for Platformless AI

**Beta Testing Without Real Funds**: Experiment on Base Sepolia testnet with free test ETH from faucet.`,
  },
  {
    id: 'users-5',
    question: 'What if I need help or have issues?',
    category: 'users',
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

**What We DON'T Have** (vs. Traditional Platforms):
❌ Phone support, live chat, SLA guarantees, refund department

**What We DO Have**:
✅ Transparent on-chain data
✅ Open-source code
✅ Active community
✅ Developer-friendly SDK

**Emergency**: Security issues → security@fabstir.com (bug bounty available)`,
  },

  // Hosting FAQ
  {
    id: 'hosting-1',
    question: 'How do I become a GPU provider?',
    category: 'hosting',
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
./fabstir-host-cli register --model "Mistral-7B" --stake 100 --price 2000
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
• $0.002 per 1K tokens
• **Est. $50-200/month** (depends on demand)

**Support**: Join Discord #hosting channel for setup help.`,
  },
  {
    id: 'hosting-2',
    question: 'What hardware do I need?',
    category: 'hosting',
    answer: `GPU requirements vary by model size:

**Minimum (Entry-Level)**:
• GPU: NVIDIA RTX 3060 (12GB VRAM)
• Can run: 1B-3B parameter models
• Performance: ~50 tokens/sec
• Est. earnings: $20-50/month
• RAM: 16GB, Storage: 100GB SSD, Internet: 50 Mbps upload
• Power: 650W PSU

**Recommended (Mid-Tier)**:
• GPU: RTX 4070 Ti (12GB) or RTX 3090 (24GB)
• Can run: 7B-13B parameter models (Mistral 7B, Llama 3 8B)
• Performance: ~150 tokens/sec
• Est. earnings: $100-300/month
• RAM: 32GB, Storage: 500GB NVMe SSD, Internet: 100 Mbps
• Power: 850W PSU

**Optimal (High-End)**:
• GPU: RTX 4090 (24GB) or A100 (40GB)
• Can run: 13B-70B parameter models (Llama 3 70B)
• Performance: ~300 tokens/sec (RTX 4090), ~500 tokens/sec (A100)
• Est. earnings: $300-1000/month
• RAM: 64GB+ DDR5, Storage: 1TB+ NVMe SSD, Internet: 500 Mbps+
• Power: 1000W+ PSU

**GPU Comparison**:

| GPU | VRAM | Max Model | Tokens/Sec | Power | Monthly $ |
|-----|------|-----------|------------|-------|-----------|
| RTX 3060 | 12GB | 3B (Q4) | ~50 | 170W | $20-50 |
| RTX 3090 | 24GB | 13B (Q4) | ~120 | 350W | $70-180 |
| RTX 4090 | 24GB | 70B (Q4) | ~300 | 450W | $200-600 |
| A100 | 40GB | 70B (Q4) | ~500 | 400W | $400-1200 |

**Why NVIDIA Only?** Requires CUDA and Risc0 CUDA acceleration. AMD/Intel not yet supported.

**Multiple GPUs?** Yes - run multiple nodes on different ports, register each separately.`,
  },
  {
    id: 'hosting-3',
    question: 'How do I get paid for hosting models?',
    category: 'hosting',
    answer: `Payment is automatic via smart contracts. Here's how it works:

**Payment Flow**:

1. **User Creates Job**: User deposits funds (e.g., $1 in ETH/USDC) into smart contract escrow
2. **Job Assignment**: Smart contract assigns job to you based on model, price, uptime
3. **Inference**: You process user's encrypted prompts and generate responses
4. **Proof Generation**: Every 1000 tokens, you generate a STARK proof (via Risc0) proving computation occurred
5. **Proof Submission**: Proof (~221KB) stored on S5 storage, hash submitted to blockchain
6. **Verification**: Smart contract verifies proof hash matches S5-stored proof
7. **Payment Release**: Payment automatically released from escrow to your wallet
8. **Withdraw**: Accumulated earnings can be withdrawn anytime

**Payment Rates**:

You set your own pricing (competitive marketplace):
• **7B models**: Typically $0.001-$0.002 per 1K tokens
• **70B models**: Typically $0.01-$0.02 per 1K tokens

**Example Earnings** (Mistral 7B at $0.002 per 1K tokens):
• 1 million tokens processed = $2.00
• 100 jobs/day averaging 5K tokens = 500K tokens/day = $1/day = $30/month
• Higher traffic = higher earnings

**Fee Structure**:
• **You receive**: ~95% of user payment
• **Network fee**: ~5% goes to protocol treasury
• **Gas costs**: Minimal on Base L2 (~$0.005 per proof submission)

**When Do I Get Paid?**

Payments are released **immediately** after proof verification (usually within 1 block ~2 seconds on Base L2).

**Withdrawing Earnings**:

\`\`\`bash
./fabstir-host-cli withdraw --amount 10.0
# Withdraws 10 USDC to your wallet
\`\`\`

**Payment Tokens**: You can accept ETH, USDC, or FAB tokens (configured in your node).

**No Middleman**: Payments go directly from user's wallet → smart contract escrow → your wallet. No platform takes a cut.`,
  },
  {
    id: 'hosting-4',
    question: 'What are the staking requirements?',
    category: 'hosting',
    answer: `**Staking is required to become a GPU provider.** This ensures hosts are committed and deters malicious behavior.

**Staking Amount**:

Minimum stake depends on the model you're hosting:
• **Small models (1B-3B)**: 50 FAB tokens (~$50)
• **Medium models (7B-13B)**: 100 FAB tokens (~$100)
• **Large models (70B+)**: 500 FAB tokens (~$500)

(Values are examples; actual amounts set by governance)

**How to Stake**:

1. **Acquire FAB Tokens**: Buy on Uniswap or other DEX on Base L2
2. **Register & Stake**:
\`\`\`bash
./fabstir-host-cli register --model "Mistral-7B" --stake 100
\`\`\`
3. **Tokens Locked**: Staked tokens are locked in smart contract while you're an active host

**What Happens to Staked Tokens?**

• **Normal Operation**: Tokens remain locked but earn you priority for job assignments
• **Graceful Exit**: When you unregister, tokens are returned after a cooling-off period (7 days)
• **Slashing**: If you misbehave (submit fake proofs, excessive downtime), you can lose part or all of stake

**Slashing Conditions**:

You risk losing staked tokens if:
• ❌ Submit fraudulent STARK proofs
• ❌ Uptime below 90% for extended period
• ❌ Fail to respond to jobs after accepting them
• ❌ Tamper with encryption/data

**Slashing is rare** - designed only to punish malicious actors, not honest mistakes.

**Benefits of Higher Stakes**:

• ✅ Priority job assignment (users trust higher-staked hosts)
• ✅ Reputation boost in marketplace
• ✅ Can host multiple models with one stake (if sufficient)

**Unstaking Process**:

\`\`\`bash
./fabstir-host-cli unregister
# Stake enters 7-day cooldown period
# After 7 days, tokens automatically returned to your wallet
\`\`\`

**Do I Earn Interest on Staked Tokens?**

No, but you earn from processing jobs. Think of staking as a security deposit, not an investment.`,
  },
  {
    id: 'hosting-5',
    question: 'How are payments settled?',
    category: 'hosting',
    answer: `Payments are settled **automatically and trustlessly** via smart contracts on Base L2. No manual invoicing or payment collection needed.

**Settlement Process**:

1. **Job Creation**: User deposits funds into escrow (e.g., $1 USDC for ~500K tokens at $0.002/1K)
2. **Job Acceptance**: Your node accepts the job (or it's assigned by smart contract)
3. **Inference**: You process encrypted prompts and generate responses
4. **Proof Checkpoints**: Every 1000 tokens, you generate a STARK proof:
   • Proof proves computation occurred correctly
   • Proof (~221KB) uploaded to S5 decentralized storage
   • Proof hash (32 bytes) submitted to blockchain
5. **Verification**: Smart contract verifies:
   • Proof hash matches S5-stored proof
   • Proof is valid (cryptographic verification)
   • Token count is accurate
6. **Payment Release**: If valid, payment released from escrow:
   • Proportional to tokens processed (e.g., 1000 tokens = $0.002)
   • Sent directly to your wallet
   • Transaction completes in ~2 seconds on Base L2
7. **Remaining Escrow**: If job ends early (user stops), remaining escrow refunded to user

**Why STARK Proofs?**

Proofs are cryptographic evidence that you:
• Actually ran the AI model (not just returning random text)
• Processed the correct number of tokens
• Did the work honestly

Smart contracts verify proofs without trusting you or the user.

**Settlement Speed**:

• **Per-checkpoint**: Every 1000 tokens (~2-5 seconds to generate proof, ~2 seconds to settle on-chain)
• **Final settlement**: When job completes, any remaining payment released immediately

**Gas Costs**:

• **You pay**: ~$0.005 per proof submission (Base L2 gas)
• **Profitable**: Even at low token counts (1000 tokens = $0.002 revenue, $0.005 gas = still profitable at scale)

**Dispute Resolution**:

If user claims you didn't process correctly:
• Smart contract checks the STARK proof
• Proof is mathematically verifiable - no human judgment needed
• Invalid proof = you don't get paid (and risk slashing)
• Valid proof = you get paid, user's complaint dismissed

**Multi-Currency Support**:

You can accept payment in:
• ETH (native currency)
• USDC (stablecoin, most popular)
• FAB tokens (platform governance token)

**No Chargebacks**: Blockchain payments are irreversible. Once you receive payment, it's final.`,
  },
];

export const categoryNames = {
  general: 'General FAQ',
  users: 'Users',
  hosting: 'Hosting',
} as const;
