import React, { useContext, useRef, useState } from 'react'; // 리액트, useContext, useRef, useState 불러오기
import Input from '../../UI/Input'; // Input 컴포넌트 불러오기
import styles from './MealItemForm.module.css'; // CSS 모듈 불러오기
import CartContext from '../../../context/CartContext'; // CartContext 불러오기

interface MealItemFormProps { // MealItemFormProps 인터페이스 정의
  id: string;
  name: string;
  description: string;
  price: number;
}

function MealItemFrom({ // MealItemFrom 컴포넌트 정의
  id, name, description, price,
}: MealItemFormProps) { // MealItemFormProps 인터페이스를 props로 받음
  const { addItem } = useContext(CartContext); // CartContext에서 addItem 함수 불러오기
  const [amount, setAmount] = useState<number>(1); // amount와 setAmount 상태 변수 정의
  const inputRef = useRef(null); // inputRef useRef로 정의

  const mealItem = { // mealItem 객체 정의
    id,
    name,
    description,
    price,
  };

  const addItemHandler = (e: React.FormEvent<HTMLFormElement>) => { // addItemHandler 함수 정의
    e.preventDefault(); // 기본 이벤트 방지
    const input = inputRef.current as unknown as HTMLInputElement; // inputRef에서 HTMLInputElement 타입으로 형변환하여 input 변수에 할당
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (input) input.value = String(amount); // input이 존재하면 amount 값을 문자열로 변환하여 input의 value에 할당
    addItem({ mealItem, amount }); // addItem 함수 호출
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { // onChange 함수 정의
    setAmount(Number(e.target.value)); // e.target.value 값을 숫자로 변환하여 amount 상태 변수에 할당
  };

  return ( // JSX 반환
    <form className={styles.form} onSubmit={addItemHandler}>
      <Input // Input 컴포넌트 추가
        key={id} // key 값 설정
        label="Amount" // 라벨 텍스트 설정
        input={{ // input 속성 설정
          id: `${id}`, // id 값 설정
          ref: inputRef, // ref 값 설정
          type: 'number', // type 값 설정
          min: '1', // 최소값 설정
          max: '5', // 최대값 설정
          step: '1', // 증감값 설정
          defaultValue: '1', // 기본값 설정
          onChange, // onChange 이벤트 핸들러 추가
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default MealItemFrom; // MealItemFrom 컴포넌트 내보내기
