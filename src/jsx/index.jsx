class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            // return 'You liked this.';
            return (
                <p>
                    You Much liked this.
                </p>
            );
        }


        return (
            <button
                onClick={() => this.setState({ liked: true })}
            >
                Much Like
            </button>
        );
    }
}

class DeptsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { depts: [] };
    }

    render() {
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
                    <tr>
                        <td>One</td>
                        <td>Two</td>
                    </tr>

                    <tr>
                        <td>Three</td>
                        <td>Four</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}


class DeptsButton extends React.Component {
    constructor(props) {
        super(props);
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
                console.log(results);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <button
                onClick={this.fetchData}
            >
                Fetch Data
            </button>
        );
    }
}


/* Like Button Content */
ReactDOM.render(
    <LikeButton/>,
    document.getElementById('like_button_container')
);

/* Fetch Button Content */
ReactDOM.render(
    <DeptsButton/>,
    document.getElementById('fetch-depts')
);

/* Departments Table Content */
ReactDOM.render(
    <DeptsTable/>,
    document.getElementById('departments')
);