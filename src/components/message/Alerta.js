const Alerta = ({ useAlert, setUseAlert }) => {
  let timer1 = setTimeout(() => setUseAlert({}), 3500);

  return (
    <>
      <div
        className={` fixed z-50  bottom-0 p-4 mb-4 text-sm text-${useAlert.color}-700 bg-${useAlert.color}-100 rounded-lg dark:bg-${useAlert.color}-200 dark:text-${useAlert.color}-800`}
        role="alert"
      >
        <span className="font-medium">{useAlert.type}</span>
        {useAlert.message}
      </div>
    </>
  );
};

export default Alerta;
