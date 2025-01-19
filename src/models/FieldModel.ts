export default interface FieldModel {
    id: string;
    name: string;
    size: number;
    location: {
        latitude: number;
        longitude: number;
    };
    images: {
        image1?: string;
        image2?: string;
    };
}
