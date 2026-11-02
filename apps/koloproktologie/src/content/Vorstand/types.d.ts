export type Person = {
    name: string;
    portrait?: string;
    text?: string;
    email?: string;
    order_vors: number;
    order_praes: number;
    data?: {
        info?: string;
        order: number;
    };
};
