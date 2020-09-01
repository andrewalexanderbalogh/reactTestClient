/**
 * Produce a Table listing Departments Data
 */
class DepartmentsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const departments = this.props.departments.map(department => {
            return (
                <tr key={department.dept_no}>
                    <td>{department.dept_no}</td>
                    <td>{department.dept_name}</td>
                </tr>
            );
        });


        return (
            <table>
                <caption>
                    The Departments
                </caption>

                <colgroup>
                    <col/>
                    <col/>
                </colgroup>

                <thead>
                    <tr>
                        <th scope="col">Dept_No</th>
                        <th scope="col">Dept_Name</th>
                    </tr>
                </thead>

                <tbody>
                    {departments}
                </tbody>
            </table>
        )
    }
}


/**
 * Produce Appropriate Data for Departments Section
 */
class DepartmentsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            failure: false
        };

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        let _this = this;
        _this.setState({
            failure: false
        });

        const request = new Request(
            `${window.Configs.host}/departments`
        );

        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
        };


        fetch(request, requestOptions)
            .then(response => {
                if (response.status === 200){
                    return response.json();
                }
                else {
                    throw response.text();
                }
            })
            .then(results => {
                _this.setState({
                    departments: results
                });
            })
            .catch(error => {
                _this.setState({
                    failure: true
                });

                if (error instanceof Promise) {
                    error.then(errorMessage => {
                        console.warn(errorMessage);
                    });
                }
                else {
                    console.warn(error);
                }
            });
    }

    render() {
        let departmentContent;
        if (this.state.failure){
            departmentContent = <aside className="lowlight">Failed To Fetch Department Records</aside>;
        }
        else if (this.state.departments.length){
            departmentContent = <DepartmentsTable departments={this.state.departments}/>;
        }
        else {
            departmentContent = <aside>No Department Data</aside>;
        }


        return (
            <div>
                <button onClick={this.fetchData}>
                    Fetch Department Data
                </button>

                {departmentContent}
            </div>
        );
    }
}


/**
 * Produce a Table listing Employees Data
 */
class EmployeesTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const employees = this.props.employees.map(employee => {
            return (
                <tr key={employee.emp_no}>
                    <td>{employee.emp_no}</td>
                    <td>{employee.birth_date}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.hire_date}</td>
                </tr>
            );
        });


        return (
            <table>
                <caption>
                    The Employees
                </caption>

                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                </colgroup>

                <thead>
                    <tr>
                        <th scope="col">Emp_No</th>
                        <th scope="col">Birth_Date</th>
                        <th scope="col">First_Name</th>
                        <th scope="col">Last_Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Hire_Date</th>
                    </tr>
                </thead>

                <tbody>
                    {employees}
                </tbody>
            </table>
        )
    }
}


/**
 * Produce Appropriate Data for Departments Section
 */
class EmployeesSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],

            gender: '',
            hireDate: '',

            failure: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleHireDateChange = this.handleHireDateChange.bind(this);
    }

    handleGenderChange(event) {
        this.setState({gender: event.target.value});
    }

    handleHireDateChange(event) {
        this.setState({hireDate: event.target.value});
    }

    fetchData(){
        let _this = this;
        _this.setState({
            failure: false
        });

        const request = new Request(
            `${window.Configs.host}/employees?gender=${this.state.gender}&hire_date=${this.state.hireDate}`
        );

        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
        };


        fetch(request, requestOptions)
            .then(response => {
                if (response.status === 200){
                    return response.json();
                }
                else {
                    throw response.text();
                }
            })
            .then(results => {
                _this.setState({
                    employees: results
                });
            })
            .catch(error => {
                _this.setState({
                    failure: true
                });

                if (error instanceof Promise) {
                    error.then(errorMessage => {
                        console.warn(errorMessage);
                    });
                }
                else {
                    console.warn(error);
                }
            });
    }

    render() {
        let employeeContent;
        if (this.state.failure){
            employeeContent = <aside className="lowlight">Failed To Fetch Employee Records</aside>;
        }
        else if (this.state.employees.length){
            employeeContent = <EmployeesTable employees={this.state.employees}/>;
        }
        else {
            employeeContent = <aside>No Employee Data</aside>;
        }


        return (
            <div>
                <button onClick={this.fetchData}>
                    Fetch Employee Data
                </button>

                <label>
                    Gender:
                    <select value={this.state.gender} onChange={this.handleGenderChange}>
                        <option value="" hidden disabled>Please select a valid option</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </label>

                <label>
                    Hire Date:
                    <input type="date" value={this.state.hireDate} onChange={this.handleHireDateChange} />
                </label>

                {employeeContent}
            </div>
        );
    }
}


/**
 * Produce Form Data for Create Employee Section
 */
class CreateEmployeeSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empNo: '',
            birthDate: '',
            firstName: '',
            lastName: '',
            gender: '',
            hireDate: '',

            success: false,
            failure: false
        };


        this.createEmployee = this.createEmployee.bind(this);
        this.handleEmpNoChange = this.handleEmpNoChange.bind(this);
        this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleHireDateChange = this.handleHireDateChange.bind(this);
    }


    createEmployee(event){
        event.preventDefault();

        let _this = this;
        _this.setState({
            success: false,
            failure: false
        });

        const request = new Request(`${window.Configs.host}/employees`);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            body: JSON.stringify({
                emp_no: _this.state.empNo,
                birth_date: _this.state.birthDate,
                first_name: _this.state.firstName,
                last_name: _this.state.lastName,
                gender: _this.state.gender,
                hire_date: _this.state.hireDate
            })
        };


        fetch(request, requestOptions)
            .then(response => {
                if (response.status === 200){
                    return response.text();
                }
                else {
                    throw response.text();
                }
            })
            .then(results => {
                console.log(results);
                _this.setState({
                    success: true,
                    failure: false
                });
            })
            .catch(error => {
                _this.setState({
                    success: false,
                    failure: true
                });

                if (error instanceof Promise) {
                    error.then(errorMessage => {
                        console.warn(errorMessage);
                    });
                }
                else {
                    console.warn(error);
                }
            });
    }


    handleEmpNoChange(event) {
        this.setState({empNo: event.target.value});
    }

    handleBirthDateChange(event) {
        this.setState({birthDate: event.target.value});
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleGenderChange(event) {
        this.setState({gender: event.target.value});
    }

    handleHireDateChange(event) {
        this.setState({hireDate: event.target.value});
    }


    render() {
        return (
            <form id="new-employee">
                <button form="new-employee" onClick={this.createEmployee}>
                    Create New Employee
                </button>

                <label>
                    Emp_No:
                    <input type="number" value={this.state.empNo} onChange={this.handleEmpNoChange} />
                </label>

                <label>
                    Birth Date:
                    <input type="date" value={this.state.birthDate} onChange={this.handleBirthDateChange} />
                </label>

                <label>
                    First Name:
                    <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                </label>

                <label>
                    Last Name:
                    <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />
                </label>

                <label>
                    Gender:
                    <select value={this.state.gender} onChange={this.handleGenderChange}>
                        <option value="" hidden disabled>Please select a valid option</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </label>


                <label>
                    Hire Date After:
                    <input type="date" value={this.state.hireDate} onChange={this.handleHireDateChange} />
                </label>


                {   this.state.success &&
                    <aside className="highlight">Successfully Created New Employee</aside>
                }

                {   this.state.failure &&
                    <aside className="lowlight">Failed To Create New Employee</aside>
                }
            </form>
        );
    }
}


/* Departments Section Content */
ReactDOM.render(
    <DepartmentsSection/>,
    document.getElementById('departments')
);


/* Employee Section Content */
ReactDOM.render(
    <EmployeesSection/>,
    document.getElementById('employees')
);


/* Create Employee Content */
ReactDOM.render(
    <CreateEmployeeSection/>,
    document.getElementById('create-employee')
);