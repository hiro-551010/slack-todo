import { ChatPostMessageResponse, ConversationsHistoryResponse, WebClient } from '@slack/web-api';
// TODO: Messageの型情報を持っているファイルのimport
// Channelもおそらくこれではない
import { Channel } from '@slack/web-api/dist/response/ConversationsListResponse';
import { Message } from '@slack/web-api/dist/response/ConversationsHistoryResponse';

import { SLACK_TOKENS } from '../../models/slackTokens';

export class EmojiReaction {
  async execute(body: any): Promise<void> {
    try {
      const DM_TO_BOT_CHANNEL_ID = 'D050A3UCW0K';
      const client: WebClient = new WebClient(SLACK_TOKENS.BOT_TOKEN);
      const timestamp: string = body.event.item.ts;
      // botとのDMチャンネルを検索
      const conversationsListResponse = await client.conversations.list({
        types: 'im',
      });
      const channels = conversationsListResponse.channels;
      const targetChannel: Channel | undefined = channels?.find(channel =>
        channel.id === DM_TO_BOT_CHANNEL_ID
      );
      // undefinedの可能性をなくす
      // TODO: channelのモデルを自作する
      if (targetChannel === undefined) {
        throw 'not found channel';
      } else if (targetChannel.id === undefined) {
        throw 'can not get targetChannel.id'
      }

      // timestampを使ってメッセージを取得
      const result: ConversationsHistoryResponse = await client.conversations.history({
        channel: SLACK_TOKENS.CHANNEL_ID,
        oldest: timestamp,
        latest: timestamp,
        inclusive: true,
      });
      const message: any = result.messages![0];

      // メッセージスレッドを検索するために必要な情報を取得
      try {
        const searchText = '今日のTODO';
        const result = await client.conversations.history({ channel: DM_TO_BOT_CHANNEL_ID });
        const targetMessage = result.messages?.find(m => m.text!.includes(searchText))!;

        // スレッド内に新しいメッセージを投稿
        await this.postMessage(client, targetChannel.id, message.text, targetMessage.ts!);
      } catch (error) {
        const postMessageResponse: ChatPostMessageResponse =
          await client.chat.postMessage({
            channel: targetChannel.id!,
            text: '今日のTODO',
            reply_broadcast: true,
            thread_ts: timestamp,
        });
        const threadTimestamp = postMessageResponse.ts!;
        // スレッド内に新しいメッセージを投稿
        await this.postMessage(client, targetChannel.id!, message.text, threadTimestamp);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async postMessage(client: WebClient, targetChannelId: string, message: string, timestamp: string) {
    await client.chat.postMessage({
      channel: targetChannelId,
      text: message,
      thread_ts: timestamp,
    });
  }
}

