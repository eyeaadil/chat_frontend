// STARTER CODE FOR THIS FILE
const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
	return (
		<div className='flex mt-1'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender==='male'? 'selected':''}`}>
					<span className='label-text text-white'>Male</span>
					<input type='checkbox' className='checkbox border-slate-900 bg-slate-300' checked={selectedGender==='male'} onChange={()=>onCheckboxChange("male")} />
				</label>
			</div>
			<div className='form-control ml-9'>
				<label className={`label gap-2 cursor-pointer ${selectedGender==='female'? 'selected':''}`}>
					<span className='label-text text-white'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900 bg-slate-300'  checked={selectedGender==='female'} onChange={()=>onCheckboxChange("female")} />
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;