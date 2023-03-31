type TChannel = {
	id: string,
	created: number,
	is_archived: boolean,
	is_im: boolean,
	is_org_shared: boolean,
	context_team_id: string,
	updated: number,
	user: string,
	is_user_deleted: boolean,
	priority: number,
};

export class Channel {
	private id: string;
	private created: number;
	private is_archived: boolean;
	private is_im: boolean;
	private is_org_shared: boolean;
	private context_team_id: string;
	private updated: number;
	private user: string;
	private is_user_deleted: boolean;
	private priority: number;

	constructor(channel: TChannel) {
		this.id = channel.id
		this.created = channel.created
		this.is_archived = channel.is_archived
		this.is_im = channel.is_im
		this.is_org_shared = channel.is_org_shared
		this.context_team_id = channel.context_team_id
		this.updated = channel.updated
		this.user = channel.user
		this.is_user_deleted = channel.is_user_deleted
		this.priority = channel.priority
	}

	public getId() {
		return this.id
	}

	public getCreated() {
		return this.created
	}

	public getIsArchived() {
		return this.is_archived
	}

	public getIsIm() {
		return this.is_im
	}

	public getIsOrgShared() {
		return this.is_org_shared
	}

	public getContextTeamId() {
		return this.context_team_id
	}

	public getUpdated() {
		return this.updated
	}

	public getUser() {
		return this.user
	}

	public getIsUserDeleted() {
		return this.is_user_deleted
	}

	public getPriority() {
		return this.priority
	}
}