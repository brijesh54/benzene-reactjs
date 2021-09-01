class Config {
    static loginUrl = "https://benzene-api.herokuapp.com/api/gettoken/";
    static refreshApiUrl = "https://benzene-api.herokuapp.com/api/resfresh_token/";
    static companyApiUrl = "https://benzene-api.herokuapp.com/api/company/";
    static homeApiUrl = "https://benzene-api.herokuapp.com/api/home_api/";
    static customerRequestApiUrl = "https://benzene-api.herokuapp.com/api/customer_request/";
    static medicineNameApiUrl = "https://benzene-api.herokuapp.com/api/medicinebyname/";
    static companyBankApiUrl = "https://benzene-api.herokuapp.com/api/companybank/";
    static generateBillApiUrl = "https://benzene-api.herokuapp.com/api/generate_bill_api/";
    static companyAccountApiUrl = "https://benzene-api.herokuapp.com/api/companyaccount/";
    static companyOnly = "https://benzene-api.herokuapp.com/api/companyonly/";
    static employeeApiURL = "https://benzene-api.herokuapp.com/api/employee/";
    static medicineApiUrl = "https://benzene-api.herokuapp.com/api/medicine/";
    static employeeBankApiUrl = "https://benzene-api.herokuapp.com/api/employee_all_bank/";
    static employeeBankApiUrlBYID =
        "https://benzene-api.herokuapp.com/api/employee_bankby_id/";
    static employeeSalaryApiUrl =
        "https://benzene-api.herokuapp.com/api/employee_all_salary/";
    static employeeSalaryByIdApiUrl =
        "https://benzene-api.herokuapp.com/api/employee_salaryby_id/";
    static homeUrl = "/home";
    static logoutPageUrl = "/logout";


    static sidebarItem = [
        { "index": "0", "title": "Home", "url": "/home", "icons": "mdi mdi-home" },
        { "index": "1", "title": "Company", "url": "/company ", "icons": "mdi mdi-view-list" },
        { "index": "2", "title": "Add Medicine", "url": "/addMedicine ", "icons": "mdi mdi-view-list" },
        { "index": "3", "title": "Manage Medicine", "url": "/manageMedicine ", "icons": "mdi mdi-view-list" },
        {
            index: "4",
            title: "Manage Company Account",
            url: "/manageCompanyAccount",
            icons: "mdi mdi-view-list",
        },
        {
            index: "5",
            title: "Manage Employee",
            url: "/employeeManage",
            icons: "mdi mdi-view-list",
        },
        {
            index: "6",
            title: "Generate Bill",
            url: "/generateBill",
            icons: "mdi mdi-view-list",
        },
        {
            index: "7",
            title: "Customer Request",
            url: "/customerRequest",
            icons: "mdi mdi-view-list",
        },
    ]
}

export default Config;