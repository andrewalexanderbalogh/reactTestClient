'use strict';

const re = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            // return 'You liked this.';
            return re(
                'p',
                null,
                'You Generally liked this.'
            );
        }

        return re(
            'button',
            {
                onClick: () => this.setState({ liked: true })
            },
            'Generally Like'
        );
    }
}

ReactDOM.render(
    re(LikeButton),
    document.getElementById('like_button_container')
);