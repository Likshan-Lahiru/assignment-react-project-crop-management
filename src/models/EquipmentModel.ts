export default interface EquipmentModel {
    id: string;
    name: string;
    type: 'ELECTRICAL' | 'MECHANICAL';
    status: 'AVAILABLE' | 'UNAVAILABLE';
    staffId: string;
    fieldId: string;
}