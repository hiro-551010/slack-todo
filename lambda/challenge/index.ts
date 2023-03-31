import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { EmojiReaction } from './functions/emojiReaction/app';

exports.handler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
  try {
    const stringBody: any = JSON.parse(event.body!);
    console.info(stringBody);
    // slackのurlチェック
    if (stringBody.challenge !== undefined) {
      return await verificationUrl(stringBody);
    }

    // todoリアクションされたとき
    if (stringBody.event.reaction === 'eyes') {
      const emojiReaction = new EmojiReaction();
      await emojiReaction.execute(stringBody);
    }
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
    body: "Script END!!!"
  }
}

async function verificationUrl(stringEventBody: any): Promise<APIGatewayProxyResult> {
  const body = {
    challenge: stringEventBody.challenge
  };
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}