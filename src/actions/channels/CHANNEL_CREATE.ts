import { Action } from '../../lib/structures/Action';
import { Channel } from '../../client/caching/structures/channels/Channel';
import { isGuildChannel } from '../../util/Util';

import type { ChannelCreateDispatch } from '@klasa/ws';

export default class CoreAction extends Action {

	public check(): Channel | null {
		return null;
	}

	public build(data: ChannelCreateDispatch): Channel | null {
		return Channel.create(this.client, data.d, data.d.guild_id && this.client.guilds.get(data.d.guild_id));
	}

	public cache(data: Channel): void {
		if (isGuildChannel(data)) data.guild.channels.set(data.id, data);
		else this.client.dms.set(data.id, data);
	}

}