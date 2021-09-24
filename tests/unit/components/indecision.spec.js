import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

describe('Test of Indecision Component', () => {
    
    let wrapper
    let clgSpy

    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach(() => {
        wrapper = shallowMount(Indecision)

        clgSpy = jest.spyOn( console, 'log')

        jest.clearAllMocks()
    })

    test('should match with snapshot', () => {
        expect(wrapper.html).toMatchSnapshot()
    })

    test('writing in input should not trigger anything (console.log)', async() => {

        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo')

        expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).not.toHaveBeenCalled()
        //expect(getAnswerSpy).toHaveBeenCalledTimes(0)
    })

    test('writing symbol ? should trigger the getAnswer', async() => {

        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo?')

        //expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).toHaveBeenCalled()
    });

    test('test in getAnswer', async() => {
        
        await wrapper.vm.getAnswer()

        //console.log(wrapper.vm.img)
        //console.log(wrapper.vm.answer)
        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Si!')

    });

    test('test in getAnswer - failed in API', async() => {
  
        // TODO: fail api
        fetch.mockImplementationOnce( () => Promise.reject('API is down'))
        
        await wrapper.vm.getAnswer()
        
        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe('Cannot load image from API')
    });


})