import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {
  
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })

    test('should match with the snapshot', () => {
        expect(wrapper.html).toMatchSnapshot()
    })

    test('should h2 has default value', () => {
        expect(wrapper.find('h2').exists()).toBeTruthy();

        const h2Value = wrapper.find('h2').text()

        expect(h2Value).toBe('Counter')        
    })

    test('should counter contain default value of 100', () => {
        //const pTags = wrapper.findAll('p')
        //expect(pTags[1].text()).toBe('100')

        const value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe('100')

    })

    test('should increment and decrement the counter', async() => {
        const [ increaseBtn, decreaseBtn ] = wrapper.findAll('button')

        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()
        
        expect(value).toBe('101')
    })

    test('should establish the default value', () => {
        //console.log(wrapper.props())
        const { start } = wrapper.props()
        //const start = wrapper.props('start')
        //console.log(start, typeof start)
        
        const value = wrapper.find('[data-testid="counter"]').text()
        //console.log(value);

        expect( Number(value) ).toBe(start)
    })

    test('should show prop title', () => {
        const title = 'Hola Mundo!!!'
        const wrapper = shallowMount(Counter, {
            props: {
                title
            }
        })

        //console.log(wrapper.html());
        expect(wrapper.find('h2').text()).toBe(title)
    })

})