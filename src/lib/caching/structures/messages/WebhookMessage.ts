import { Structure } from '../base/Structure';
import { extender } from '../../../util/Extender';

import type { APIMessageData, MessageType } from '@klasa/dapi-types';
import type { Embed } from '../Embed';
import type { User } from '../User';
import type { WebhookClient } from '../../../client/WebhookClient';

export class WebhookMessage<T = WebhookClient> extends Structure<T> {

	/**
	 * Id of the message.
	 * @since 0.0.1
	 */
	public readonly id: string;

	/**
	 * Author of this message.
	 * @since 0.0.1
	 */
	public readonly author: User<T>;

	/**
	 * Contents of the message.
	 * @since 0.0.1
	 */
	public content: string;

	/**
	 * Whether or not this was a TTS message.
	 * @since 0.0.1
	 */
	public tts!: boolean;

	/**
	 * The embedded data.
	 * @since 0.0.1
	 */
	public embeds: Embed[] = [];

	/**
	 * Used for validating a message was sent.
	 * @since 0.0.1
	 */
	public readonly nonce?: string | null;

	/**
	 * If the message is generated by a webhook, this is the webhook's id.
	 * @since 0.0.1
	 */
	public readonly webhookID?: string | null;

	/**
	 * The type of message.
	 * @since 0.0.1
	 * @see https://discord.com/developers/docs/resources/channel#message-object-message-types
	 */
	public readonly type: MessageType;

	public constructor(client: T, data: APIMessageData) {
		super(client);
		this.id = data.id;
		this.content = data.content;
		// eslint-disable-next-line dot-notation
		this.author = new (extender.get('User'))(client, data.author) as unknown as User<T>;
		this.type = data.type;

		this.nonce = data.nonce ?? null;
		this.webhookID = data.webhook_id ?? null;
	}

	/**
	 * When this message was sent.
	 * @since 0.0.1
	 */
	public get createdAt(): Date {
		return new Date(this.createdTimestamp);
	}

	/**
	 * Defines the toString behavior of this structure.
	 * @since 0.0.4
	 */
	public toString(): string {
		return this.content;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected _patch(_data: Partial<APIMessageData>): this {
		return this;
	}

}
