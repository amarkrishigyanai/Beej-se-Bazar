import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/thunks/authThunk";
import { Lock, Phone, AlertCircle, Eye, EyeOff } from "lucide-react";
import theme from '../config/theme';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const displayError = formError || error;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    const value = mobile.trim();

    if (!value) return setFormError("Please enter your mobile number");
    if (!/^[6-9][0-9]{9}$/.test(value)) return setFormError("Enter a valid 10-digit Indian mobile number");
    if (!password) return setFormError("Please enter your password");

    setFormError("");

    try {
      const payload = { phone: value, password };

      await dispatch(loginUser(payload)).unwrap();

      navigate("/dashboard");
    } catch (err) {
      setFormError(
        err?.response?.data?.message || err?.message || "Invalid mobile or password",
      );
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* LEFT – LOGIN FORM */}
      <div className="flex items-center justify-center w-full px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-brand-600 rounded-xl">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{theme.brand}</h1>
            <p className="text-sm text-gray-600">{theme.tagline}</p>
          </div>

          {displayError && (
            <div className="flex gap-2 p-3 mb-4 border border-red-200 rounded-lg bg-red-50">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-700">{displayError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <div className="relative text-gray-400 transition-colors duration-200 focus-within:text-brand-500">
                <Phone className="absolute w-5 h-5 left-3 top-3" />
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ""));
                    setFormError("");
                  }}
                  className="pl-10 w-full py-2.5 border rounded-lg focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative text-gray-400 focus-within:text-brand-500">
                {/* Left Icon */}
                <Lock className="absolute w-5 h-5 left-3 top-3" />

                {/* Input */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormError("");
                  }}
                  className="w-full py-2.5 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-brand-500"
                />

                {/* Show/Hide Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute text-gray-500 right-3 top-3 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-brand-700 hover:bg-brand-800 text-white"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="font-semibold text-brand-700 cursor-pointer hover:text-brand-800"
            >
              Create one
            </span>
          </p>

          <p className="mt-4 text-xs text-center text-gray-500">
            Secure login for authorized administrators only
          </p>
        </div>
      </div>

      {/* RIGHT – IMAGE SECTION */}
      <div className="relative hidden w-1/2 lg:flex">
        <img
          src="https://images.unsplash.com/photo-1683506684881-efbb5203eacf?fm=jpg&q=60&w=3000"
          alt="Farming"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center px-10 bg-brand-900/70">
          <div className="max-w-md text-white">
            <h2 className="mb-4 text-3xl font-bold">Empowering Farmers</h2>
            <p className="text-sm leading-relaxed text-brand-100">
              Modern technology meets traditional farming. Manage your Farmer
              Producer Organization with ease and efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
