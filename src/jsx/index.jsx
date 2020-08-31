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


/* Departments Section Content */
ReactDOM.render(
    <DepartmentsSection/>,
    document.getElementById('departments')
);


/* Employee Section Content */