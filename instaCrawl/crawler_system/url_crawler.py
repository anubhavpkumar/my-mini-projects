import requests
from queue_client import Client_Queue
import sys

def send_request_to_url(url):
    payload={}
    headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'X-CSRFToken': 'Dct9JaECYyNPfUlsYN6EgYDrX5x9D9D0',
    'X-IG-App-ID': '936619743392459',
    'X-ASBD-ID': '198387',
    'X-IG-WWW-Claim': 'hmac.AR04vjYZxoJNkn6M-DHxUhHNviR0hxzslxyJZbNO5SyztwuQ',
    'X-Requested-With': 'XMLHttpRequest',
    'Alt-Used': 'www.instagram.com',
    'Connection': 'keep-alive',
    'Referer': 'https://www.instagram.com/the_girl_that_love_backless/',
    'Cookie': 'ig_did=991D7BC3-C5D5-4448-A272-AC07F8460BE5; ig_nrcb=1; csrftoken=Dct9JaECYyNPfUlsYN6EgYDrX5x9D9D0; mid=Y0r7pQAEAAFO-zcSf5DVqRmWc0_z; sessionid=3243669251%3A9PtOWjdNNM8LIO%3A6%3AAYdLE-VgXYeFl1P9yO5_y64ACtXWHasYokrRuqUSaw; ds_user_id=3243669251; datr=ffxKY89uTmO4kewV8tF4rShd; fbm_124024574287414=base_domain=.instagram.com; shbid="7908\\0543243669251\\0541702281329:01f74d88b43cdaeb0a33d93d4b5fa1f9cec71839b1e47081a48ff015a9b01a51cf59cd59"; shbts="1670745329\\0543243669251\\0541702281329:01f7bd46c783a206216a717fa0cf1245e5320c66b5346bb3552a9ffd924e15c4f1f58e44"; rur="NAO\\0543243669251\\0541702281507:01f7be0ea351e1594358570a4d5e289aba08056978dcb38d4aadfdc255786dd85456ba8e"; csrftoken=Dct9JaECYyNPfUlsYN6EgYDrX5x9D9D0; ds_user_id=3243669251; rur="NAO\\0543243669251\\0541702284672:01f7195fcbb73fe7fab346699ecb40c3a31349ee2eb01f9a9875788d51802af635f4ea30"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'TE': 'trailers'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    return response

client_queue = Client_Queue(9002)

def get_next_max(user_id, next_max_id):
    url =  'https://www.instagram.com/api/v1/feed/user/'+str(user_id)+'/?count=100&max_id='+ str(next_max_id)
    response = send_request_to_url(url)
    response_json = response.json()
    items_of_images = response_json['items']

    for items in items_of_images:
        if ('carousel_media' in items.keys()):
            carousel_media = items['carousel_media']
            for carousel_media_single in carousel_media:
                image_version_2 = carousel_media_single['image_versions2']
                if ('candidates' in image_version_2.keys()):
                    image_candidate = image_version_2['candidates']
                    first_image_candidate = image_candidate[0]
                    image_url = first_image_candidate['url']
                    client_queue.push_to_queue(image_url)
        elif ('image_versions2' in items.keys()):
            image_version_2 = items['image_versions2']
            if ('candidates' in image_version_2.keys()):
                image_candidate = image_version_2['candidates']
                first_image_candidate = image_candidate[0]
                image_url = first_image_candidate['url']
                client_queue.push_to_queue(image_url)

    if ('next_max_id' in response_json.keys()):
        next_max_id = response_json['next_max_id']
        get_next_max(user_id, next_max_id)

def push_url_to_queue(user_insta_handle):
    url = "https://www.instagram.com/api/v1/feed/user/"+user_insta_handle+"/username/?count=100"

    response = send_request_to_url(url)
    response_json = response.json()
    items_of_images = response_json['items']
    user_id = response_json['user']['pk']

    for items in items_of_images:
        if ('carousel_media' in items.keys()):
            carousel_media = items['carousel_media']
            for carousel_media_single in carousel_media:
                image_version_2 = carousel_media_single['image_versions2']
                if ('candidates' in image_version_2.keys()):
                    image_candidate = image_version_2['candidates']
                    first_image_candidate = image_candidate[0]
                    image_url = first_image_candidate['url']
                    client_queue.push_to_queue(image_url)
        elif ('image_versions2' in items.keys()):
            image_version_2 = items['image_versions2']
            if ('candidates' in image_version_2.keys()):
                image_candidate = image_version_2['candidates']
                first_image_candidate = image_candidate[0]
                image_url = first_image_candidate['url']
                client_queue.push_to_queue(image_url)

    if ('next_max_id' in response_json.keys()):
        next_max_id = response_json['next_max_id']
        get_next_max(user_id, next_max_id)
        



user_insta_handle = 'anubhav_p_kumar'

push_url_to_queue(user_insta_handle)
