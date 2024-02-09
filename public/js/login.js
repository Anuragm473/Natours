/* eslint-disable */
const hidenAlert=()=>{
    const el=document.querySelector('.alert')
    if (el) el.parentElement.removeChild(el)
}
const showAlert=(type,msg)=>{
    hidenAlert()
    const mark=`<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin',mark)
    window.setTimeout(hidenAlert,4000)
}
const login=async(email,password)=>{
    try{
        const res=await axios({
            method:'POST',
            url:'/api/v1/users/login',
            data:{
                email,
                password
            }
        })
        if(res.data.status==='success'){
            showAlert('success','Logged In Successful')
            window.setTimeout(()=>{
                location.assign('/');
            },1000)
        }
    }catch(err){
        showAlert('error',err.response.data.message)
    }
}
const logout=async(email,password)=>{
    try{
        const res=await axios({
            method:'GET',
            url:'/api/v1/users/logout'
        })
        if(res.data.status==='success'){
            showAlert('success','Logged Out Successful')
            location.reload(true)
        }
    }catch(err){
        console.log(err)
        showAlert('error',"error loggingout,Try again Later!")
    }
}
const loginout=document.querySelector('.nav__el--logout')
const loginUser=document.querySelector('.form--login')
if (loginUser){
    document.querySelector('.btn--green').addEventListener('click',el=>{
        el.preventDefault();
        const email=document.getElementById('email').value
        const password=document.getElementById('password').value
        login(email,password)
   })
}
if(loginout){
    loginout.addEventListener('click',logout)
}
const updateMe=async(data,type)=>{
    const url= type==='data'?'/api/v1/users/updateMe':'/api/v1/users/updateMyPassword'
    try{
        const res=await axios({
            method:'PATCH',
            url,
            data
        })
        if(res.data.status==='success'){
            showAlert('success','Updated')

        }
    }catch(error){
        showAlert('error',error.response.data.message)
    }
}
const update=document.querySelector('.form-user-data')
if(update){
    update.addEventListener('submit',el=>{
        el.preventDefault();
        const form=new FormData()
        form.append('name',document.getElementById('name').value)
        form.append('email',document.getElementById('email').value)
        form.append('photo',document.getElementById('photo').files[0])
        updateMe(form,'data')
    })
}
const updatePassword=document.querySelector('.form-user-settings')
if(updatePassword){
    updatePassword.addEventListener('submit',async el=>{
        el.preventDefault();
        const password=document.getElementById('password').value
        const passwordCurrent=document.getElementById('password-current').value
        const passwordConfirm=document.getElementById('password-confirm').value
        await updateMe({passwordCurrent,password,passwordConfirm},'password')
        document.getElementById('password').value=''
        document.getElementById('password-current').value=''
        document.getElementById('password-confirm').value=''
    })
}
const bookBtn=document.getElementById('book-tour');
const stripe=Stripe('pk_test_51Oh53MSEBMa2qACOYg47RyDkNM7VdkaPs3LsV637FeriPsqCTNyEcHzmUdiGhOofrDvU1E19MmeuyMzUWibey7Z500oN7GRMD4')
const booktour=async tourId=>{
    try{
        const session=await axios(`/api/v1/booking/checkout-session/${tourId}`)
        await stripe.redirectToCheckout({
            sessionId:session.data.session.id
        })
    }catch(err){
        showAlert('error','Something Went Wrong')
    }
}
if(bookBtn){
    bookBtn.addEventListener('click',e=>{
        e.target.textContent='Processing...';
        const {tourId}=e.target.dataset;
        booktour(tourId)
    })
}