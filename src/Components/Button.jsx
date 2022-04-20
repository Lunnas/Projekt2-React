function Button({ converterFn }) {
  return (
    <button id="btn" onClick={converterFn}>
      Przelicz!
    </button>
  );
}

export default Button;
