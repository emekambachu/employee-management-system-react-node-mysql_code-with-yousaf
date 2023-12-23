export const Login = () => {
    return (
        <>
            <div className={"d-flex justify-content-center align-items-center vh-100 login-page"}>
                <div className={"p-3 rounded w-25 border login-form"}>
                    <h1>Login Page</h1>
                    <form>
                        <div className="mb-2">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" autoComplete="off"
                                   placeholder="Enter Email" className="form-control rounded-0" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" placeholder="Enter Password"
                                   className="form-control rounded-0" />
                        </div>
                        <button type="submit" className="btn btn-primary rounded-0">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}