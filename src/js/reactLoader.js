(function(){
    // Load particular React linguistics based on query parameter given
    const reactLoader = function(){
        let script = document.createElement('script');
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.has('react') && urlParams.get('react') === 'js'){
            console.log('loading JS');
            script.src = './js/index.js';
            script.type = 'text/javascript';
        }
        else if (urlParams.has('react') && urlParams.get('react') === 'jsx'){
            console.log('loading JSX');
            script.src = './jsx/index.jsx';
            script.type = 'text/babel';
        }
        else {
            // JSX will be the default linguistic
            console.log('loading JSX');
            script.src = './jsx/index.jsx';
            script.type = 'text/babel';
        }


        document.documentElement.appendChild(script);
    };

    document.addEventListener('DOMContentLoaded', reactLoader, false);
})();