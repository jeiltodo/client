import { Member } from '@jeiltodo/ui/entities';
import { Goal } from '@jeiltodo/ui/shared';

// 그룹 리스트
export interface GroupsResponse {
	msg: string;
	code: number;
	data: GroupPageResponse;
}

export interface GroupPageResponse {
	totalCount: number;
	searchedCount: number;
	currentPage: number;
	groups: Groups[];
}

export interface GroupQueryParams {
	page: number;
	limit: string | number | undefined;
	nickname?: string;
	group?: string;
}

export interface GroupMembers {
	id: number;
	isLeader: boolean;
	nickname: string;
	color: string;
	contributionRank: number;
}

//그룹 상세

export interface GroupDetailResponse {
	id: number;
	title: string;
	secretCode: string;
	createUser: string;
	members: Member[];
	goals: Goal[];
}
export interface Groups {
	id: number;
	title: string;
	createUser: string;
	createdAt: string;
	updatedAt: string;
	members: GroupMembers[];
}

export interface GroupErrorResponse {
	msg: string;
	code: number;
}
