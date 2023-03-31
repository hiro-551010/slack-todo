const SLACK_TOKENS = {
  CHANNEL_ID: process.env.SLACK_CHANNEL_ID!,
  USER_TOKEN: process.env.SLACK_API_USER_TOKEN!,
  BOT_TOKEN: process.env.SLACK_API_BOT_TOKEN!,
}

type SlackTokens = typeof SLACK_TOKENS[keyof typeof SLACK_TOKENS];

export { SlackTokens, SLACK_TOKENS };
