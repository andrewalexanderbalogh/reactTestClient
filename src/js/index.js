'use strict';

const re = React.createElement;


/**
 * Produce a Table listing Departments Data
 */
class DepartmentsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const departments = this.props.departments.map(department => {
            return re(
                'tr',
                {key: department.dept_no},
                re(
                    'td',
                    null,
                    department.dept_no
                ),
                re(
                    'td',
                    null,
                    department.dept_name
                )
            );
        });


        return re(
            'table',
            null,
            re(
                'caption',
                null,
                'The Departments'
            ),
            re(
                'colgroup',
                null,
                re('col', null),
                re('col', null)
            ),
            re(
                'thead',
                null,
                re(
                    'tr',
                    null,
                    re(
                        'th',
                        { scope: 'col' },
                        'Dept_No'
                    ),
                    re(
                        'th',
                        { scope: 'col' },
                        'Dept_Name'
                    )
                )
            ),
            re(
                'tbody',
                null,
                departments
            )
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
            departmentContent = re(
                'aside',
                { className: 'lowlight' },
                'Failed To Fetch Department Records'
            );
        }
        else if (this.state.departments.length){
            departmentContent = re(
                DepartmentsTable,
                { departments: this.state.departments }
            );
        }
        else {
            departmentContent = re(
                'aside',
                null,
                'No Department Data'
            );
        }


        return re(
            'div',
            null,
            re(
                'button',
                { onClick: this.fetchData },
                'Fetch Department Data'
            ),
            departmentContent
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
            return re(
                'tr',
                { key: employee.emp_no },
                re(
                    'td',
                    null,
                    employee.emp_no
                ),
                re(
                    'td',
                    null,
                    employee.birth_date
                ),
                re(
                    'td',
                    null,
                    employee.first_name
                ),
                re(
                    'td',
                    null,
                    employee.last_name
                ),
                re(
                    'td',
                    null,
                    employee.gender
                ),
                re(
                    'td',
                    null,
                    employee.hire_date
                )
            );
        });



        return re(
            'table',
            null,
            re(
                'caption',
                null,
                'The Employees'
            ),
            re(
                'colgroup',
                null,
                re('col', null),
                re('col', null),
                re('col', null),
                re('col', null),
                re('col', null),
                re('col', null)
            ),
            re(
                'thead',
                null,
                re(
                    'tr',
                    null,
                    re(
                        'th',
                        { scope: 'col' },
                        'Emp_No'
                    ),
                    re(
                        'th',
                        { scope: 'col' },
                        'Birth_Date'
                    ),
                    re(
                        'th',
                        { scope: 'col' },
                        'First_Name'
                    ),
                    re(
                        'th',
                        { scope: 'col' },
                        'Last_Name'
                    ),
                    re(
                        'th',
                        { scope: 'col' },
                        'Gender'
                    ),
                    re(
                        'th',
                        { scope: 'col' },
                        'Hire_Date'
                    )
                )
            ),
            re(
                'tbody',
                null,
                employees
            )
        );
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
            employeeContent = re(
                'aside',
                { className: 'lowlight' },
                'Failed To Fetch Employee Records'
            );
        }
        else if (this.state.employees.length){
            employeeContent = re(
                EmployeesTable,
                { employees: this.state.employees }
            );
        }
        else {
            employeeContent = re(
                'aside',
                null,
                'No Employee Data'
            );
        }


        return re(
            'div',
            null,
            re(
                'button',
                { onClick: this.fetchData },
                'Fetch Employee Data'
            ),
            re(
                'label',
                null,
                'Gender:',
                re(
                    'select',
                    { value: this.state.gender, onChange: this.handleGenderChange },
                    re(
                        'option',
                        { value: '', hidden: true, disabled: true },
                        'Please select a valid option'
                    ),
                    re(
                        'option',
                        { value: 'M' },
                        'Male'
                    ),
                    re(
                        'option',
                        { value: 'F' },
                        'Female'
                    )
                )
            ),
            re(
                'label',
                null,
                'Hire Date:',
                re(
                    'input',
                    { type: 'date', value: this.state.hireDate, onChange: this.handleHireDateChange }
                )
            ),
            employeeContent
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
        return re(
            'form',
            { id: 'new-employee' },
            re(
                'button',
                { form: 'new-employee', onClick: this.createEmployee },
                'Create New Employee'
            ),
            re(
                'label',
                null,
                'Emp_No:',
                re(
                'input',
                { type: 'number', value: this.state.empNo, onChange: this.handleEmpNoChange }
                )
            ),
            re(
                'label',
                null,
                'Birth Date:',
                re(
                    'input',
                    { type: 'date', value: this.state.birthDate, onChange: this.handleBirthDateChange }
                )
            ),
            re(
                'label',
                null,
                'First Name:',
                re(
                'input',
                { type: 'text', value: this.state.firstName, onChange: this.handleFirstNameChange }
                )
            ),
            re(
                'label',
                null,
                'Last Name:',
                re(
                'input',
                { type: 'text', value: this.state.lastName, onChange: this.handleLastNameChange }
                )
            ),
            re(
                'label',
                null,
                'Gender:',
                re(
                    'select',
                    { value: this.state.gender, onChange: this.handleGenderChange },
                    re(
                        'option',
                        { value: '', hidden: true, disabled: true },
                        'Please select a valid option'
                    ),
                    re(
                        'option',
                        { value: 'M' },
                        'Male'
                    ),
                    re(
                        'option',
                        { value: 'F' },
                        'Female'
                    )
                )
            ),
            re(
                'label',
                null,
                'Hire Date After:',
                re(
                'input',
                { type: 'date', value: this.state.hireDate, onChange: this.handleHireDateChange }
                )
            ),
            this.state.success && re(
                'aside',
                { className: 'highlight' },
                'Successfully Created New Employee'
            ),
            this.state.failure && re(
                'aside',
                { className: 'lowlight' },
                'Failed To Create New Employee'
            )
        );
    }
}


/* Departments Section Content */
ReactDOM.render(
    re(DepartmentsSection, null),
    document.getElementById('departments')
);

/* Employee Section Content */
ReactDOM.render(
    re(EmployeesSection, null),
    document.getElementById('employees')
);

/* Create Employee Content */
ReactDOM.render(
    re(CreateEmployeeSection, null),
    document.getElementById('create-employee')
);