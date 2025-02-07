type ToggleTypes = {
	isOn: boolean;
	handleToggle: () => void;
};

const Toggle = ({ isOn, handleToggle }: ToggleTypes) => {
	return (
		<>
			<label className="flex cursor-pointer select-none items-center">
				<div className="relative">
					<input
						type="checkbox"
						checked={isOn}
						onChange={handleToggle}
						className="sr-only"
					/>
					<div
						className={`box block h-8 w-14 rounded-full ${
							isOn ? "bg-primary" : "bg-dark"
						}`}
					></div>
					<div
						className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
							isOn ? "translate-x-full" : ""
						}`}
					></div>
				</div>
			</label>
		</>
	);
};

export default Toggle;
