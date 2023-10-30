import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveAReview } from "../Utils/LeaveReview";

export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  currenLoansCount: number;
  isAuthentication: any;
  isCheckout: boolean;
  chckoutBook: any;
  isReviewLeft: boolean;
  submitReview: any;
}> = (props) => {
  function buttonRender() {
    if (props.isAuthentication) {
      if (!props.isCheckout && props.currenLoansCount < 5) {
        return (
          <button
            onClick={() => props.chckoutBook()}
            className="btn btn-success btn-lg"
          >
            Checkout
          </button>
        );
      } else if (props.isCheckout) {
        return (
          <p>
            <b>Book check out. enjoy</b>
          </p>
        );
      } else if (!props.isCheckout) {
        return <p className="text-denger">Too meny books check out</p>;
      }
      return (
        <Link to={"/login"} className="btn btn-succes btn-lg ">
          Log in
        </Link>
      );
    }
  }
  function reviewRender() {
    if (props.isAuthentication && !props.isReviewLeft) {
      return (
        <p>
          <LeaveAReview submitReview={props.submitReview} />
        </p>
      );
    } else if (props.isAuthentication && props.isReviewLeft) {
      return (
        <p>
          <b>Thank you for your review!</b>
        </p>
      );
    }
    return (
      <div>
        <hr />
        <p>Sign in to be able to leave a review.</p>
      </div>
    );
  }
  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{props.currenLoansCount}/5 </b>
            books checked out
          </p>
          <hr />
          {props.book &&
          props.book.copiesAvailable &&
          props.book.copiesAvailable > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{props.book?.copies} </b>
              copies
            </p>
            <p className="col-6 lead">
              <b>{props.book?.copiesAvailable} </b>
              available
            </p>
          </div>
        </div>
        {buttonRender()}
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        {reviewRender()}
      </div>
    </div>
  );
};
