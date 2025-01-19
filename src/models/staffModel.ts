export default  interface StaffModel {
    id: string;
    firstName: string;
    lastName: string;
    designation: string;
    gender: 'MALE' | 'FEMALE';
    joinedDate: string;
    dob: string;
    address: {
        buildingNo: string;
        lane: string;
        city: string;
        state: string;
        postalCode: string;
    };
    contactNo: string;
    email: string;
    role: 'MANAGER' | 'ADMINISTRATIVE' | 'SCIENTIST' | 'OTHER';
}
