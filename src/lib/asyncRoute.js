import { h, Component } from 'preact';

const cacheCompontents = {};

class AsyncRoute extends Component {

  loadComponent() {
    const componentData = this.props.component(this.props.url, ({component}) => {
      cacheCompontents[this.props.cname] = component;
      this.setState({});
    });

  // componentData && componentData.then && componentData.then(component => {
  //   cacheCompontents[this.props.cname] = component;
  //   this.setState({});
  // 	console.log('preload load', this.props.cname);
  // });
  }

  componentDidMount() {
    this.loadComponent();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url && this.props.url !== nextProps.url) {
      this.setState({}, this.loadComponent.bind(this));
    }
  }

  render() {
    const localComponent = cacheCompontents[this.props.cname];
    if (localComponent) {
      return h(localComponent, this.props);
    } else if (this.props.loading) {
      const loadingComponent = this.props.loading();
      return loadingComponent;
    }
    return null;
  }
}

export default AsyncRoute;
