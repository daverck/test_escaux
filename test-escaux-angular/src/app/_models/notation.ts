import {FeedbackNotation} from './enums';

export class Notation {
    fk_feedback: number;
    fk_user: number;
    notation: FeedbackNotation;
    datetime_created: Date;

    constructor(obj?: Notation) {
        // console.log(obj);
        this.fk_feedback = obj && obj.fk_feedback || null;
        this.fk_user = obj && obj.fk_user || null;
        this.notation = obj && obj.notation || null;
        this.datetime_created = obj && obj.datetime_created || null;
    }
}