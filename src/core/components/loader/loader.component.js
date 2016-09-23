import LoaderTemplate from './loader.template.html';
import './loader.style.css';

export default {
    bindings: {
        'active': '<'
    },
    template: LoaderTemplate,
    transclude: true
};
