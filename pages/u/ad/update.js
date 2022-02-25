const UpdateAds = () => {
  return (
    <>
      <h1
        style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "500" }}
      >
        Customer
      </h1>
      <div className='container'>
        <div className='row'>
          <div
            className='col-md-6'
            style={{
              padding: "23px",
              borderRadius: "9px",
              borderStyle: "none",
            }}
          >
            <div className='row'>
              <div
                className='col d-md-flex justify-content-md-center align-items-md-center'
                style={{ borderStyle: "none" }}
              >
                <i
                  className='fa fa-user d-flex justify-content-center align-items-center'
                  style={{ fontSize: "100px", textAlign: "center" }}
                ></i>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='form-group mb-3'>
                  <label className='form-label' for='from-name'>
                    Business Name
                  </label>
                  <span className='required-input'>*</span>
                  <div className='input-group'>
                    <span className='input-group-text'>
                      <i className='fa fa-user-o'></i>
                    </span>
                    <input
                      className='form-control'
                      type='text'
                      id='from-name-1'
                      name='name'
                      required=''
                      placeholder='Full Name'
                    />
                  </div>
                </div>
                <div className='form-group mb-3'>
                  <label className='form-label' for='from-email'>
                    Web site Sub-Link
                  </label>
                  <span className='required-input'>*</span>
                  <div className='input-group'>
                    <input
                      className='form-control'
                      type='text'
                      id='from-email-1'
                      name='email'
                      required=''
                      placeholder='LINK'
                      inputmode='url'
                    />
                  </div>
                </div>
                <div className='form-group mb-3'>
                  <label className='form-label' for='from-phone'>
                    AD Description
                  </label>
                  <span className='required-input'>*</span>
                  <div className='input-group'></div>
                </div>
                <textarea
                  className='d-md-flex flex-nowrap'
                  id='from-comments-3'
                  name='comments'
                  placeholder='Add your description'
                  rows='5'
                  style={{ width: "100%", border: "1px solid black" }}
                ></textarea>
              </div>
            </div>
          </div>
          <div
            className='col-md-6'
            style={{ borderStyle: "none", padding: "23px" }}
          >
            <div className='form-group mb-3'>
              <label className='form-label' for='from-name'>
                Time Posted
              </label>
              <span className='required-input'>*</span>
              <div className='input-group'>
                <input className='form-control' type='datetime-local' />
              </div>
            </div>
            <div className='form-group mb-3'>
              <label className='form-label' for='from-name'>
                Ad Name
              </label>
              <span className='required-input'>*</span>
              <div className='input-group'>
                <input
                  className='form-control'
                  type='text'
                  placeholder='Enter your Ad name'
                />
              </div>
            </div>
            <div className='form-group mb-3'>
              <label className='form-label' for='from-name'>
                Add Photo
              </label>
              <span className='required-input'>*</span>
              <div className='input-group'>
                <input className='form-control' type='file' accept='image/*' />
              </div>
            </div>
            <div className='form-group mb-3'>
              <label className='form-label' for='from-name'>
                Add Video
              </label>
              <span className='required-input'>*</span>
              <div className='input-group'>
                <input className='form-control' type='file' accept='video/*' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div
          className='col d-flex d-md-flex justify-content-center align-items-center justify-content-md-center align-items-md-center'
          style={{ margin: "13px" }}
        >
          <button
            className='btn btn-primary d-md-flex align-items-md-center'
            type='button'
          >
            Button
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateAds;
