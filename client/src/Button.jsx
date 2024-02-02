function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className=" border border-black px-2 py-1 rounded-lg bg-black text-slate-50 hover:bg-slate-50 hover:text-black transition-all"
    >
      {children}
    </button>
  );
}

export default Button;
