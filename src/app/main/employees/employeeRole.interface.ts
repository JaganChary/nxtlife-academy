export interface employee {
    fullName: string;
    gender: string;
    email: string;
    contactNo: string;
    joiningDate: string;
    employeeRoles: EmployeeRole[];
}

export interface EmployeeRole {
    departmentId: string;
    id: string;
}