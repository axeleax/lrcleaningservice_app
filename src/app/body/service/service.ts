export class Service {
    label: string;
    detail: string;
    image: string;
    orientation: 'LEFT' | 'RIGHT';

    constructor(label: string, detail: string, image: string, orientation: 'LEFT' | 'RIGHT') {
        this.label = label;
        this.detail = detail;
        this.image = image;
        this.orientation = orientation;
    }
}