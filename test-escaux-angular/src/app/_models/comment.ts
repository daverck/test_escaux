export class Comment {
    pk: number;
    fk_user: number;
    fk_feedback: number;
    comment: string;
    datetime_created: Date;

    constructor(obj?: Comment) {
        // console.log(obj);
        this.pk = obj && obj.pk || null;
        this.fk_user = obj && obj.fk_user || null;
        this.fk_feedback = obj && obj.fk_feedback || null;
        this.comment = obj && obj.comment || null;
        this.datetime_created = obj && obj.datetime_created || null;
    }
}