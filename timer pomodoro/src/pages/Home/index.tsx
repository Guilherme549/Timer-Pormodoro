import { Play } from "phosphor-react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountDownButton, 
    TaskInput } from "./styles";
import { useState } from "react";
                                     // validando um objeto
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos')
})


// Tipagem do data
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
} 

export function Home(){
    const [ cycles, setCycles ] = useState<Cycle[]>([])
    const [ activeCycledId, setActiveCycledId] = useState<string | null>(null)
    const [ amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    // register adicione um input no formulario
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 5,
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData){
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycledId(id)
        reset();
    }

    const activeCycle = cycles.find(cycles => cycles.id === activeCycledId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed: 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds %60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    // ira observar o campo de task se esta vazio ou nao
    const task = watch('task')
    const isSubmitDisabled = !task;

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou Trabalhar em</label>
                    <TaskInput 
                    id="task" 
                    list="task-suggestions"
                    placeholder="De um nome para o seu projeto"
                    {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                    type="number" 
                    id="minutesAmount" 
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
                    {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>
            

            <CountdownContainer>
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <Separator>:</Separator>
                <span>{seconds[0]}</span>
                <span>{seconds[1]}</span>
            </CountdownContainer>

            <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                <Play size={24}/>
                Começar
            </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}