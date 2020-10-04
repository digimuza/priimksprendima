/**
 * Create MVP of Toastma app. 
 * 1. Program mannager
 * 2. User mannager
 */

/**
 * Sections
 *  Role - Toastmaster Timer, (TIME TRACKABLE, Injectable) 
 *  Text - 
 * 
 *  Sessions - Table topic, Speaches
 */
export interface Speach {
    speaker: {
        title: string
        participantId: string
    } | null
    evaluator: {
        participantId: string
    } | null
}

interface Person {
    displayName: string
    avatar?: string
}
export namespace Guests {
    export interface Guest {
        displayName: string
        email?: string
    }
    export interface Data {
        guests: Record<string, Guest>
    }
}

export namespace Participants {
    export interface MemberParticipant {
        type: "member"
        memberId: string
    }

    export type GuestParticipant = {
        type: "guest"
        guestId: string
    }
    export type Participant = MemberParticipant | GuestParticipant
    export interface Data extends Members.Data, Guests.Data {
        /**
         * [ParticipantId, Participant]
         */
        participants: Record<string, Participant>
    }

    export class Factory {
        constructor(private data: Data) {}
        get(participantId: string): Person {
            const participant = this.data.participants[participantId]
            if (participant == null) throw new Error(`Failed to find participant with Id of ${participantId}`)
            if (participant.type === 'member') {
                const member = this.data.members[participant.memberId]
                if (member == null) throw new Error(`Failed to find member with id of ${participant.memberId}`)
                return member 
            }
            const guest = this.data.guests[participant.guestId]
            if (guest == null) throw new Error(`Failed to find guest with id of ${participant.guestId}`)
            return guest
        }  
    }
}

export namespace Speaches {
    export interface Speach {
        speakerParticipationId: string
        title: string
        duration: { min: number, max: number }
    }
    export interface SpeachGroup {
        speach: Speach | null
        evaluator: {
            participantId: string
        } | null
    }
    export class Factory {
        constructor(private data: Data, private participantFactory: Participants.Factory) {}
        list(): ReadonlyArray<ExpandedSpeach> {
            return Object.entries(this.data.speaches).map(([id, val])=>{
                return new ExpandedSpeach(id, val, this.participantFactory)
            })
        }
    }
    export class ExpandedSpeach {
        constructor(public id: string, private speachGroup: SpeachGroup, private participantFactory: Participants.Factory) {}
        get speach() {
            const speach = this.speachGroup.speach
            if (speach == null) return
            return {
                speaker: this.participantFactory.get(speach.speakerParticipationId),
                title: speach.title,
                duration: speach.duration
            }
        }
        get evaluator() {
            if (this.speachGroup.evaluator == null) return
            return this.participantFactory.get(this.speachGroup.evaluator.participantId)
        }
    }
    export interface Data {
        /**
         * [ParticipantId, Participant]
         */
        speaches: Record<string, SpeachGroup>
    }
}

export namespace Members {
    export interface Member {
        displayName: string
        id: string
        avatar: string
    }
    export interface Data {
        members: Record<string, Member>
    }
}

export class Roles {
    constructor(private data: Roles.Data,private participationService: Participants.Factory) {}
    list(): ReadonlyArray<Roles.ExpandedRole> {
        return Object.entries(this.data).map(([id,val]) => {
            const person = this.participationService.get(val)
            const role = this.data.rolesMeta[id]
            return {
                id,
                ...role,
                ...person,
            }
        } )
    }
}
export namespace Roles {
    export interface ExpandedRole extends Person {
        id: string
        roleDisplayName: string
    }
    export interface Data {
        roles: Record<string, string>
        rolesMeta: Record<string, { roleDisplayName: string }>
    }
}

export namespace SerializedTemplate {
    export interface Section {
        title?: string
    }

    export interface Row {

    }

    export namespace Row {
        export interface RoleData {
            type: "role"
            roleId: string
            actionTemplate: string
            dutyTemplate: string
            presenterTemplate: string
            durationRange: { min: number, max: number }
        }
        export class RoleFactory {
            constructor(protected role: RoleData) { }
            create() { }
        }
        export class Role {
            constructor() { }
        }

    }
}


export namespace Program { }