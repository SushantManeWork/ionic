import { Injectable } from '@angular/core';
import { IMember } from 'src/app/interface/imember';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
   members: IMember[] = [
    {
      id: 1,
      name: 'Ishani Roy',
      photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEBIQFRUVFxYVFhUVFhAVFQ8VFRUXFxUVFRUYHSggGBolGxUVITEhJSorLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHiUtLS0tLS0tLS0tLS0tKystLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAQ0AuwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAgMEBQcBAAj/xABGEAABAwEEBgcEBwcDAwUAAAABAAIDEQQFITEGEkFRYXEHEyKBkaGxIzJCwRQzUoKS0fAkNGJyorLhFlPSQ8PxFXODk8L/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QAKxEAAgIBAwQCAQMFAQAAAAAAAAECEQMSITEEMkFRInEUYYHBBRMjsfBC/9oADAMBAAIRAxEAPwDZCm3Jwppyss8UgrpKbc+ioh5yYeVAvO/YYcJJGAnIFwBKr49KYX+4Qa4ZqWEoNndILA+WhY4AjfkUGXtd1tGIcwjgiya/dzD3qvtduMgoRSqW+ogvI+PS5H4AYQW1xp1lPFWt6vfJDDE2VzXs94iuOFFdRP1WhoAouSch4Ify4Lixn4U3yDL7hGrrSWqUncKq/iszXWIWN2s5ta1qanGqca0EY0S2ChHMIH1i8IP8H2ygdoQHfbaOFSkv0Ca0/XPHOn5La7oAEVSAkf8AqdldmWd4W2PHBzpS3MJ/0ywSaotI5HP1XJLhLXHVmaeZW5vhsL8S2zk8QyqiS6MXbJiYLOSdoDQfJW6a4LU6Mas12va9pLmkawr2tlcVI0pc0T9kimqMt+K1V+gl3HKOn8r3j0Kiz9G9hd/uD77j6pcopxpDY5qdmQ7KrrStXPRvZw0ta+Sh3kGnLBU16dHQibrMmJ4EBZcmFpWjVj6iMnXkDrxYHWPHeg9sAWnWrRt5g6oOFd6FrXonPG0u7JAQY5xSodlg27SB4Rr3Vp6i5RNYhH1CSmnFdLlDvC0iON0jjRrQXOO5oxPknsxJFfpFpJBZGa8pJOQa2hcfHBY9pFppaJ9ZrXEMcaigaC0ZgA7sFF0qvs2qZ0jtamTRh2GjLDYTmVUwWNzz2G99PNDYxL0JktkjveJdjU1OJNNqfsdve0Fvw50Gwj/CmRXDKcdWu1EFg0OdIzWIAw/8UU1pBf2pMYuS+WsjpR73Et2igrWpNd2+qKISHjXbl6mmNN44oLt1wTQVq00NARnrUP68VZ3Teh1WxyOLaO7IAqBXbmP0UUscMq35LhkyYn+hfErrykurXEUO0bjw4LkjguTKLi6Z14yUkmhUacGzmmYinUPks0e6/qO75IULEV3T9T3fJDLgu/i4PNZOSOWJPVp6iSmgDRBGRPiUnrpBk9/4inXBNuColjb7xnGUr/FFFoeXWVpcakgVO9CUzUVv/dW8gk518GPwP/Ivso3lVt6fVP5KxlUG2DsOruXFO/4Mxs91yPcWgUIxxUaWzuaS0g1CPhCHM65mDhmFTzkFxJAxW+jkrNubYSsv6XrVMDGxsxEZB1oh2akZOcdoywqtOcsQ6U7UTbHsOtQBtK7atGXCtU1ikBoc4up8x5lG+jFhJpWh5V/JCtz2F0rwB+u9a1cViEbAEjJLwasEPLJlgsIbjQVVxDFgmLO1WdkYhhGx+SVEaWytcKOAIUS1aL2edhj1GtJGDgBUHmruWOibs5o8c0+K0szyepAJarA+ECKQdqPsawr22j3T4UUWQIy0+hxjeNtQeYoQg2VY+qX+SzX0jvGeiTyjxp5ZnyaTSLoPsO75IbcUR3N9R3fJDb138XB5rJyIKSupKYAecmnJxyQVCEeRFDv3VvIIWlRSf3VvIJOfsY7B3r7KOQKDeI9m/kVPeVX3gaRvPAri+T0D4BK57S5rSDUg4Lz3Mr7pTDLy1ow1rKEJn6TJuXS2Rxv7cvRt9qm1GlxyAqsS09s/Xj6a2gdUCRh96hNGuB2jIdy2O+nUid3fmgPSC7iXCINaWFue0kYg9yVlm4yXo09PijODvkGNBYiXFH0s5jaKCp2bBzJ2BDui9j6ourSpNMMgiu02ATMpWnEJN3KzRFaY0yqNttIOtHa7MXf7TozqHhr62t3qbc2mp6wQ2uzuifsc0l0b+IOzzQna9EpwJTrSOfUGIhwawCuIcKVqRXGvdtVtcl2Txx+2OsQGurucTiwDhhiMD661tGzO0pSo0QWsHFNC0MDgSQBxICqLTP1cIfmSsw0gtsH0g9eHvdWhaTM3VyNBhTJw8VadlOKRq2nkwLYmjaSQeFP8oNepEzmdXCI2lrOrBDauNNYuNceACjPK5/USvIzb00NONISxPVTUacJSGPNIuX6nu+SHH7URXH9T3fJDr9vNd/FweaycjZSUpIKaLOlNlLKQVRZHlRPX9kbyCF5UTt/dG8glZuxjsHevspZAoN5D2T+RU6QqFeR9k/kVxDvmZWEEnM5q7bDzVHd8va71etmwT5MvEk0G2nF7nqJY2swyLi4ChrUUG3LfXDJUVy3i21Q64I62MirCaOYaFpI+0w/Pgg6/dI5pWe0eS3Xd2Q1jQBWtKjE5kVPmqO4pi63RAE5uBocxqnBOnHVuzm4smh0jVrEN2018URXc7IIdu8hrQO5WTJnA9lIx8m57oKmMBFTRV94ysFGt8Bs5qos95mRxjrq6vvCva8NiiXpFaotaSBzXNrrFjm6xpTJprwWqUttjPGCTthRDZNeItIqRR3yPqqh+h9nmlLpIgdcariKguGypG6g8Eq5tIXOYNeF+ILXYauBGOeKtbnvIODSe/wCaOL4Fzi9wa0gjZHM6Jg7LGRsHANaPzVW9PW+0dZK+T7TiRyrh5UTEi5eSWqTZvxx0xSPR5p5R4Sn0LCNGuL6nu+SH5MzzV9cB9j3fJUUgxPMrv4uDzeXuGkhOJFEwWcKbcnSE09QsjyolZ+6DkFh9o0ltQdIesNQ6gFBQCp2J2PT23hnV9aC3cWtScnyjQ7H8ZJmoyKFbm1jcBtBWdjTm174zzYEo6c2k4FsJ+6R81z/xJezqfmw9M5DcsrSSW7VJETxhquTbNOZgKdVD4O/NK/1xL/sQf1fmmvDN+gV1WNcWDF7SgudqijTjSuWG/emdFx+2xHeSf6T/AJUaVxqQ7bkVO0Vsrjao307I1iONARUDdU0qre0WZlvNfZpDbRqmiurFMCWlDVsaaVT113jTsOz2FYoM6Vl/f+j8cjhOGe0GBLSWlw2VIzzUq7rBE9rjHPaIXD4XO6xrSTtacaU5c1Pu+0tmaKZ0xHFNWu6qn9VC3QfkXqpaXsVLn2lswibqzRuBrJQxmOhGw+9mpfUGNjyCci0cyMfKvip8zWWeAyvLWNaMSfModhvLr4zI8FsZI6uhLTq04bTn3hVNC3kV0iGF2RLkBo1xAGsK5Uw2JsrmyVOjdGWpWciFFIKjxFSCqZDQ9Hj7Hu+SpH5nmVc6OfU9yr3WcY47Su9jex5zKvkyFRJop30Yb0n6KN6ZYuiGQm3BWP0Ub0h1j4hVqLowe820lmbue7+4qEFZ6Rs1bTaG/wAbvWqqmpbGoVRdAXguhQh0JSSEpWQri0uOB4CuVfyWjuuU2e1D7BgiazcNRobI0d4B+8s6W4XG5lrskLnn3mN7QxMcjKscab6jLaDxQzw6oOK5Chm0zUnwVs1n1mIffHQkIwdAWOMbwARnuI2EbwVGtd0A4jCq5uhpnV1KS2Byy3vJAatJRT/q2ZlmdapIiY2Uqc3EVAqBuFcSq4XM2orQ4q5knjL4bJq1Y5r9dn2mUDS2m/tlacMblQjLNxjZnF+6Yvt5AfWONp7LMCDni7Edo+XjW90aDTCCNfsPyJqCNh+SDb5uh1mtMlnfkx3ZeMOtjI1o397S3vruRDdV8RxMDHOIoKUArtxJ8EzJjlTSQjFkjqtsLrdMHOqMgAKbqf8AlRXKujvuA/HTmHD5KbHaGPHZc08iCubkw5U7lFr9jqY8uNqoyT/cVGU+UxEE8UpjTQtGz7HuVRJIanmVa6NH2PcqaU4nmfVd7F2nm8vczvWFI6070iqTVMF2PdaU26UpNUgqEsyTSxtLZPxdXxAVKFf6atpbJOIaf6QqAJL5HLgWF1cXVZDqUkrqhCAVo/RbeVWS2dx9wazNmDjV3gRXvrsWcKxuC93WSZszcQMHt+2wkEjyB7loQlm/y2IWiJpyeB2XbqZtPCvkRuVQ6rRqvFCMCDsKuritDXRtcwgtcA5p2OByPfXHg7gnr3jh1Oslc1gbm5xAFNx4594Kz5sOvdcmnp8+j4y4Bdzicgqe7Zq3q1jq0bZ3+LpI8uNAjaGJlAWhtCKhwoQRvBQfbpQ282ljauETxhnUAuHoFmxJxyK/ZszVLG69DvSpdTXRMtIbi0iJxFMWuq5h5B1af+4BsWV0wNeQWnG/ZLdYp7PPHEwuZVuqXeycwmSMmpxFWgbMB3LKBMaLrttbM4y33Q5Z5iDTYpbZC08PRVzKVr+qp5toORzVQlRco2Fuit6FznQvNaYsJxw3IpJWX3dajHOx43haa01xXG/qWNKSmvJ2f6dlcouD8f6NB0ZPsRyVPLmeZ9Vb6MH2I5Kom953M+q24u052bvY0kpSQUwUdSClBJKhDMNPm0th4sb6FDQRX0iN/aWneweRKFAlPkcuBYSgkBLCiIeovLyUAoQrWsAxSklrqiqUE9CjT+jK8bQ2z4OaYmO1KOqdQ7QKHAEPbhxKPrbYRKD1napWm4YZjd7hPest6K7X257MfjYJG8HMOq7+lw/CtZuybXYK7MD4Cvo5NTpWhb3e5R2SzS2dxjoTGScgSBWo1uGWPJRrtud5kmtUlWOdWOOmqXNBwJFQRUilP8ozYKfriK+rk3JHWmG4nngT517wEEoxlNTa3DjOUYOCezMW6RoH2a1kROc1ssQaQ0kBzWkih3jHzQatP6Z7L2bPMPtOjPeNcep8Fl6tspHVx2fh6LlVx5xQhDjTiOa1G7360TDX4R6YrLWZiu817qI80Tthe1zT8OqRw1q1HkPFZutx6sDfpp/x/Jq6HJpzJe01/Jrui59iOSqpvedzPqrPRU+xHJVk/vO5n1V4e1Cc/exlJKUkFNFHgkldCSVRZnvSQ320R3sPk5CCNektvahPBw8wgpLlyMjwKXUkJQKhZ1dXCvKyisYaOI34/mnFGldQgqQmpiy70MtnVW2B5OBcYz/8rTGPNw8FtVzympZtx8KUb/cvntjy0hwzBBHAjELd7otIf1M7cBLGx3i2g8MT3Jsd0wJchJFasSDmCf8A9D5px8lctufKp/5BV9uZUh1M6baUq5qZsFqrRp+zjwBbF/yV6LVlaqA/pllJghaMus1z+E0H9Z8Fk9Vs3STZessjnUxDgeQPZHqfBYsCglsw48CqpMh9F6qTMDgd49CUAQovwHf8kV6E2iji3ePE5oPBVhdN49S8O5KUpJxfDVFxbhJSXh2fR+iZ9iOSgTjtO5n1Xuj+9YrRBWJ4dqijhkWHiE5M3tHmUrEmlTCzNOTaIpCbKkliacxMFDSSUshNlQsCektvZhP8Th5IFR/0lN9jGdz/AFaUABKlyMjwKC8uBdVFnl6q8uKyFTNklxuwCs9INHbVY3atpicwVID843/yvGB5Z8FURHYj8gUPgrY+jyfrbBGDnE58Z4AHWb/Q4rGQVpXQ9bB+0QOyOo8ferG7yom43uLmtjThMezUVrQnZiCCfMFNiwGNzXaoo5uGVaasdBh/KkxyYAjbXxcD8ypEk+BONAMOAxoB+JiarXAGxX37ZetgfHvb6UofEvPcvn21M1XvYfhe5v4XEfJfRUzsKd3dQ18us8lhOm8Gpb7Q3D39bDbrta4nvJJ70GTgOHJS1TryDGQc2mo7zQj9blHLkonA93680pPkNoba5ONoo4zTjChTLo0jorvP6NamM+GfsOG6vuH8VPErWpIsTzXz9oneIZa4ZH11Wva48mkEr6GZM14D2EOa7EEZEHaE6dOmhUbWzIxiTD2Kc4JlzEuwiC+NRZGqxe1RJmqEAvpGb+zNO549Cs6C0rpBb+yng5p81mjDglS5GQ4FheXAV6qoI8vVXKr1VCG83rfNn7Ucuo5pwex4BFDsIKFrzuS7IrLIC2KOOTWIfQOfC9wJa5pOJpTAV4IHv+93Of1sxo54BDW5luQNNgwOe5Dt4Xm+WjSTqg1oSTU7ykwUr34NuTJiiqStkMORb0a2kstTs6GI1G+j46fNCIRHoG4i0kj/AGz/AHxrZB/JHOlwbBY7fhQ/Dj+E1+Q8VYGbClMsOeqCPWIeKooMBjtOPLWFf7CpH0l2ArTImtMSNQkV5h/itLaQlKyyL/I/lQ+OofvlY30lMpbXPGT2tp93s+gC0yO1mgGNRQGueGtX0Hgs96Sou1C/gWnmaFLycBw5AqqU52B/WSQlwxOedRgq41oN9ATTyWa6HVZHBTjXJoFKB4ISEmGctcHDMLQ+jnTJzZ22WQHq5TQY4RyHIjcCcOZWah3BS7LbdRzX9oFpBBGQIxBp3JsJ7VewEo+a3Ppg2gAVJA5rjplnNn0ugt7DZnCSN8go0uHZLhiKOG2oyVhdmkuvZ3xzu1LTB2Dvmb7rXtG1wwrwoU6OFyjcef8AtwHNJ0F75Qo0sgVbY5pNQxS6vXwBgkLfdmjeKxTs3hwwP8QK46YoJxcXTLtFRp1jZJO4+ay2MrUNK8bLL/L81ljCkS5GQ4HarxSarlUIQqq5VJJSaqyCb8tgllLmAhga1rAcw1ooCeJzPEquK8SvIm7BFVRX0dNHXvJ2MHnIz8ihMIk0PDwZCwtBOq2rjQD3vnTyRY+5FS4NIfaRShOYp4tp/wBxQrVfUQBDngVqeNSHkY/fVBNZXu9+1wN4Bzh+sW91FMsej1mkHbtDSB9gUOIriTtwOzMHeFobYtJCJtLYmuNHOcKnEg7S/wD5BUOlN8ttMYApVpB8gETXpolZurrG57SMS53aDm41oMBmPTes9vSKFh1WSF/HVoPVKm2kGqITlOuD95h/naoBOCnXB+8w/wA4Wefa/obj7l9k3S+6uql61g7Eh/A/aO/PxVE0rUrbZWzMdG8VDhTkdhHELM7fY3QyOifm3bscNjhwKz9Pl1KnyjT1WHTLUuGNFeZj/lNpS02ZCyuq1OikDwT2SCAaEVGINEQS3yZLQyd0IbQjWAqRI2u3jTBB4Kcie4EFpIIxB3ELThzvG00Knj1H0+bI2U2a3RkNaI3QyNAFJbNKMARs1Xhp4Yobt9ldFI6N2bTnvGw94SejDSdr4RFaHxtBFKFzaY58uXFOaese5jZLLOwywHUe2rSJone66mNSDu3lVdsjRU35HrWeUfwOPgFkrCtLntEr7M5krWhzg6uqTQsY2vdU4LM48TRJnyMgthZK64ECu9SDd01Nbq3030KiO90E1zKBMNpo4XJNUkuSdZWCRAvLgXlZR1qIbku0vjDzWhJ8Bt8A7wQ81aJdFnfHG1mq00FM9taGvef6nJmONgydENtyjeQeIwNAfm0+KdbY5IiMK44EZGlMj3okgeM3NcNuIrkQ4eTXeDlMZZRTs0NNh20wH9jPxJ2hA6igivA6oaQSKUFakZCmB46h8UNaQ3M1wdNZxgMXx/FHniN4oK7wtH+hsxJwArnTLtZHl/c3cqG/7CBJ1tnkZrU7TQ5vazqRThXxUlBNUUpbmXM3Kx0aH7TF/Mf7SvX1ZwH9YwaoJ7TfsO204LujzqWmM7yfNpCx5F8X9M0Y3819o0QZoc03u4vjbO0VMdQ6m1h29x9SiBr8U6CuVCbhJM7M4KcXFmRheWoSdHDLXGZLK4RSip1TXq5OH8B4jDgs4vK75bPI6GdjmPbmD6gjAjiF1Iu1Zxpx0y0sYDl7WSF2qKwQt0LeB2nNDgH4gjMUFQtOjs9lkY1zWNqzBwGBcx2LXYbRkss0Q+rkP8Y/tRrdN5NgIkeNZvukbwRsTYeiNM5brGA8CMZhxxrgwNI8yqPQ+4zr9bM2gHug7TvRZLK6RwkaxwjIJYaHVDRs1tuKU56z9ZLRSXk29NhT+TZMDhwVXfOjUVrAApG4VoWjA13qU1ysbuhc44A0WPFKSexqyxi18jJL70YtNmfqvaSD7rwCQ78lXC7pNx8HL6N+jB7erlZrNO8Kpl0IjqdV9BsFK0W56vCOcoQ/9M+dF4JwRHcu9S7cr2E0yRddnL5GtG+vc0ax9FodibKNtee+uHmGn7xQZcErInF8la4AACtBUE48Rgi6yXmCARU4YE8m/Ng80/G41yBKL9BDZHk0qKZeGw/hkafur15XiIIzI8NAyzpiQMOXYeO4KrbeYyphl3dpvo4fhVTpZaOvgLcAWnXGOZzI/qd4o5T22KUPZx14/SQXFzi/EgE0FM6NaMAFB1jmChiG1uZQtJBGSsYr/YfrY3V2ujIGtxLSsynfIxquAhisUVpbqOqJDhgMXUqe/JDjrsms0zdZpIDqteMj+RG5OyX5ECHRCYEY1OpUHhROXnpVLPAYHMa4FzXazgNdpbXEU3gkI3KNfqDTCiz3jZ2M6yQl7iMImENof43kGgruBSWaV40bYrJ96eV3j2Vnge77A8E42U/YHgsyhBcI0Sy5Jcs0iy6YTCupZ7G2m58+XJtEzbr/ADK321ksDwftNncWnbm6o5hALLRT4Wpt85rgG+CYmvQt2W9suiFzqtfDDX4Q57mY8XuJHeobrqhA+uqdwMZ8wVB+ku3+AXhK84DWPAA4q7RVBZcEMTGOEbpCC4ElwaMabKKbaHE0aP1xT+hGiFslaTIx0bXEEF+ZFNjc/FaXcuhMMJEkntH8ch3K97QyEoxi/bAy5bVKLP1L69XrazQQf6TuqnCaYhEGmkgMjWDAMGzih+GLWcGjaVh6huWRm7DUcaLu47v6ztvy3b0WWYBuAACgWVgY0NGxPtk2rfixqCpHOzZXOVlxE4HckSMFTiqxtpU2jTjVNoTZ80dVyXur4hLEfNcMaxmw4GDaVY2DKlVBbEr/AEVscUkhbNJ1baVrTE8EceSnwNjvXJbA+VtGMe7kCfRafdlgutmRY473mvqiSzWmzgUjMY5UTaFajDYdEbS4dmzSd7aeqdZoDa9tnd3Bv5reGzt2EJXWhDoiTWzCDoFaiQG2aXjXUA9VZQdG1qMbqx0fVuqC5oAFe2T3LZDIUkylXpRWtmQt6KbUc3wDvcfQKXF0Ry/FaIhyY4/NagZHJIkcpoRHNmfQdETPjtLvuxtHqSrKHossQ9987/vBvoEY9c7cvdadymlFamCTujW7h8E3/wBj1MufQ6w2Z2vG0a2wvOuW8q5K8kaTtKhTWAHMu8USSJbLZkjBg0jyXjKht9zM2OeO8pUd3av/AFJPEqUiFNppGWSdaQS07RsVRdNrY6Rpae7ajK0wNe0seS4HYVVR3RCw6zGAHes7w3O0a1mqFMuGy1ySJZRkotqnEbOJwUaEkuruC2xW1mB80WsDu00cVZvsprhVUUUlCDxCMI6EBDZbR8x5LidexIWI2nGq10ee1svbGsCCqxoU27ffCKPJTDyI2c/DRSmQRfCQFQwqUBgtWlMTZdNZTKTzTrZnj/qHxQ7VU1+Wt7aUJ8UMlSsJbmgtt0o+NLF6yjasoZfMwyefFSItIpx8SXrL0GpC+pNoCcbfztrVmUek8/AqdDpNIc2tU1FaDQxpA3a0pxukcfEILs17l2bB4q0LWnYisHSgkbf8J+IJwXvEfiCEXWdu5NiytUsmhBbPeDNjmqumvNm14VHJA1RZWNHwqOSLWMuZr7jHxKEy/wBpdqiqHrbbdXJoVFab4eDUAIHMLQaDeU+tqc1Y2VuaFLqtrpY2Odmi27Ma8lpi7SM0lTZxjkUWW2DUbyQm09ohWkbsAqii5H//2Q==',
      phone: '+91 8888899999',
      gender: 'Female',
      address: 'Kolkata, India',
      batchName: 'Evening Batch',
      batchTime: {
        startTime:"7 PM",
        endTime:"8 PM"
      },
      trainingType: 'Personal Training',
      package: {
        plan: '1 Year Plan',
        totalAmount: 600,
        discount: 60,
        purchaseDate: new Date('01-01-2025'),
        planExpiryDate: new Date('01 Jan 2026'),
        paid: 540,
        dueAmount: 60,
        daysRemaining: 365,
      },
    },
    {
      id: 2,
      name: 'Sophia Carter',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm7m5w58FlUtthpOi3LYsuU5YioLyjQLvPSQ&s',
      phone: '+91 1234567890',
      gender: 'Female',
      address: 'San Francisco, USA',
      batchName: 'Morning Batch',
      batchTime: {
        startTime:'7:00 AM', 
        endTime:'8:30 AM'
      },
      trainingType: 'Yoga Training',
      package: {
        plan: '3 Month Plan',
        totalAmount: 200,
        discount: 20,
        purchaseDate: new Date('15 Jan 2025'),
        planExpiryDate: new Date('15 Apr 2025'),
        paid: 180,
        dueAmount: 20,
        daysRemaining: 90,
      },
    },
    {
      id: 3,
      name: 'Sneha Desai',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQal-zoU3mjqRLlaGfm4m4b3OWZAyv6BYvJXQ&s',
      phone: '+91 9090980808',
      gender: 'Female',
      address: 'Ahmedabad, India',
      batchName: 'Morning Batch',
      batchTime: {
        startTime:'7:00 AM',
        endTime:'8:30 AM'
      },
      trainingType: 'Weight Loss Program',
      package: {
        plan: '3 Month Plan',
        totalAmount: 216,
        discount: 24,
        purchaseDate: new Date('10 Jan 2024'),
        planExpiryDate: new Date('10 Apr 2024'),
        paid: 192,
        dueAmount: 24,
        daysRemaining: 90,
      },
    },
    {
      id: 4,
      name: 'Aarav Kapoor',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeCMC-UfZekMV64W9zeG-1rUM3fTqLovgPMQ&s',
      phone: '+91 9876543210',
      gender: 'Male',
      address: 'Mumbai, India',
      batchName: 'Early Morning Batch',
      batchTime: {
        startTime:'6:00 AM',
        endTime:'7:30 AM'
      },
      trainingType: 'General Fitness',
      package: {
        plan: '6 Month Plan',
        totalAmount: 180,
        discount: 0,
        purchaseDate: new Date('01 Jan 2024'),
        planExpiryDate: new Date('01 Jul 2024'),
        paid: 120,
        dueAmount: 60,
        daysRemaining: 180,
      },
    },
    {
      id: 5,
      name: "Liam O'Connor",
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxIPxdbUYnJGzZNShnt3CQ5DEai04-PDmbQ&s',
      phone: '+91 8765432105',
      gender: 'Male',
      address: 'Dublin, Ireland',
      batchName: 'Evening Batch',
      batchTime: {
        startTime:'6:00 PM',
        endTime:'7:30 PM'
      },
      trainingType: 'Strength Training',
      package: {
        plan: '6 Month Plan',
        totalAmount: 320,
        discount: 0,
        purchaseDate: new Date('15 Jan 2025'),
        planExpiryDate: new Date('15 Jul 2025'),
        paid: 270,
        dueAmount: 50,
        daysRemaining: 180,
      },
    },
  ];

  constructor() { }

  getMembers() {
    return this.members;
  }

  getMemberById(id: number) {
    return this.members.find((member) => member.id === id);
  }

  //for differnece in date in days
//   var a=new Date('15 Jan 2025');
// var b=new Date('16 Jan 2025');
// var diff = b.valueOf() - a.valueOf();
// console.log(diff/(1000 * 3600 * 24));
}
