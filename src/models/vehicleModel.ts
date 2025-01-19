export default interface VehicleModel {
    id: string;
    licenseNumber: string;
    category: string;
    fuelType: string;
    status: 'AVAILABLE' | 'UNAVAILABLE';
    staffId: string;
    remark: string;
}