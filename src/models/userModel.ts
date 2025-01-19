export default interface UserModel {
    email: string;
    role: 'MANAGER' | 'ADMINISTRATIVE' | 'SCIENTIST' | 'OTHER';
    roleCode: string;
}