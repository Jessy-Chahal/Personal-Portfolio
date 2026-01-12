import { BlogPost } from './types'
import { phishingDetectionLLMs } from './phishing-detection-llms'
import { multiAgentSecurityAnalysis } from './multi-agent-security-analysis'
import { secureAPIBestPractices } from './secure-api-best-practices'
import { networkSecurityFundamentals } from './network-security-fundamentals'
import { ethicalHackingGettingStarted } from './ethical-hacking-getting-started'
import { cryptographyModernApplications } from './cryptography-modern-applications'

export const blogPosts: BlogPost[] = [
  networkSecurityFundamentals,
  secureAPIBestPractices,
  cryptographyModernApplications,
  multiAgentSecurityAnalysis,
  phishingDetectionLLMs,
  ethicalHackingGettingStarted
].sort((a, b) => {
  // Sort by date, newest first
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})
