import {FeedbackRating} from './enums';

export class Feedback {
    pk: number;
    fk_user: number;
    rating: FeedbackRating;
    note: string;
    datetime_created: Date;

    constructor(obj?: Feedback) {
        // console.log(obj);
        this.pk = obj && obj.pk || null;
        this.fk_user = obj && obj.fk_user || null;
        this.rating = obj && obj.rating || null;
        this.note = obj && obj.note || null;
        this.datetime_created = obj && obj.datetime_created || null;
    }
}