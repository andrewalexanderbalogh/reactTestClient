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

ReactDOM.render(
    <LikeButton/>,
    document.getElementById('like_button_container')
);