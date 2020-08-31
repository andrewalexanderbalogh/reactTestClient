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
        this.state = { departments: [] };

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        let _this = this;
        const request = new Request('http://express.imprefvicticious.ca/departments');
        const reqInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        };


        fetch(request, reqInit)
            .then(response => {
                if (response.status === 200){
                    return response.json();
                }
                else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(results => {
                _this.setState({
                    departments: results
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let departmentContent;
        if (this.state.departments.length){
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
        this.state = { employees: [] };

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        let _this = this;
        const request = new Request('http://express.imprefvicticious.ca/employees?gender=M&hire_date=2020-01-01');
        const reqInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        };


        fetch(request, reqInit)
            .then(response => {
                if (response.status === 200){
                    return response.json();
                }
                else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(results => {
                _this.setState({
                    employees: results
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let employeeContent;
        if (this.state.employees.length){
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

                {employeeContent}
            </div>
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