import { useRef, useState } from 'react';
import { useStoreReg } from './hooks/useStoreReg';
import styles from './App.module.css';

const sendData = (dataForm) => {
	console.log(dataForm);
};

function App() {
	const { getState, updateState } = useStoreReg();
	const { email, password, secondPassword } = getState();
	const [passError, setPassError] = useState(null);
	const [secPassErr, setSecPassErr] = useState(null);
	const [successfulReg, setSuccessfulReg] = useState(false);
	const buttonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
	};

	const onChangePass = ({ target }) => {
		const currentPassword = target.value;

		updateState('password', currentPassword);

		let error = null;

		if (!/^[\w_]*$/.test(currentPassword)) {
			error =
				'Некорректное значение пароля. Допустимые символы - латиница, цифры, нижнее подчёркивание';
		} else if (currentPassword.length <= 5) {
			error = 'Некорректное значение пароля. Минимальное кол-во символов - 5';
		} else if (currentPassword.length >= 15) {
			error = 'Некорректное значение пароля. Максимальное кол-во символов - 15';
		}

		setPassError(error);
	};

	const onChangeSecPass = ({ target }) => {
		const currentSecondPasswor = target.value;

		let errSecPass = null;

		if (currentSecondPasswor !== password) {
			errSecPass = 'Пароли не совпадают.';
		}

		setSecPassErr(errSecPass);

		updateState('secondPassword', currentSecondPasswor);

		if (!errSecPass && !passError) {
			if (buttonRef.current) {
				buttonRef.current.focus();
			}
		}
	};

	const onSuccessfulReg = () => {
		setSuccessfulReg(true);
	};

	return (
		<div className={styles.app}>
			<div className={styles.appForm}>
				<h1>РЕГИСТРАЦИЯ</h1>
				<form onSubmit={onSubmit}>
					<input
						name="email"
						type="email"
						value={email}
						placeholder="Введите Ваш email"
						onChange={onChange}
					/>
					{passError && (
						<div
							style={{
								color: 'red',
								marginBottom: '5px',
								fontSize: '19px',
							}}
						>
							{passError}
						</div>
					)}
					<input
						name="password"
						type="password"
						value={password}
						placeholder="Введите пароль"
						onChange={onChangePass}
					/>
					{secPassErr && (
						<div
							style={{
								color: 'red',
								marginBottom: '5px',
								fontSize: '19px',
							}}
						>
							{secPassErr}
						</div>
					)}
					<input
						name="secondPassword"
						type="password"
						value={secondPassword}
						placeholder="Повторите пароль"
						onChange={onChangeSecPass}
					/>
					<button
						ref={buttonRef}
						type="submit"
						disabled={
							passError !== null ||
							secPassErr !== null ||
							email === '' ||
							password === '' ||
							secondPassword === ''
						}
						onClick={onSuccessfulReg}
					>
						Зарегистрироваться
					</button>
				</form>

				{successfulReg === true ? (
					<div style={{ color: 'green', fontSize: '20px' }}>
						Регистрация прошла успешно!
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default App;
