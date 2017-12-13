export interface employee {
    name: string;
    gender: string;
    email: string;
    contact: string;
    jdate: string;
    employeeRoles: EmployeeRole[];
}

export interface EmployeeRole {
    department: string;
    role: string;
}