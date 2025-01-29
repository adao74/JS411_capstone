import { connect } from 'react-redux'
import CreateWishlist from '../components/CreateWishlist'
import { fetchMakes, removeCar } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        makes: state.makes
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMakes: () => dispatch(fetchMakes()),
    removeCar: (index) => dispatch(removeCar(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateWishlist);

